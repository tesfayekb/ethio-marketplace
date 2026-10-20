# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39471610004
- Commit: `1a5b21bd789cf8edbd4ac303dcedd65e83d39304`
- Attempt: 1
- Written (UTC): 2026-10-20T23:06:41.747Z
- Passed: 1944 · Skipped: 98 · Failed: 6
- Gating failures: 6 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (2 of 2 results files read, 2 of 2 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

277 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>` | 178 | full |
| `digest mismatch` (quiet) | 12 | full |
| `too many previews` (quiet) | 9 | full |
| `categories badHeader` (quiet) | 4 | full |
| `categories wrongFile` (quiet) | 4 | full |
| `definitions badHeader` (quiet) | 4 | full |
| `definitions wrongFile` (quiet) | 4 | full |
| `export_failed permission denied` (quiet) | 4 | full |
| `preview_failed permission denied` (quiet) | 4 | full |
| `listing not found` | 3 | full |
| `categories file too large` (quiet) | 2 | full |
| `categories nulByte` (quiet) | 2 | full |
| `categories unknownColumn` (quiet) | 2 | full |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | full |
| `countries badHeader` (quiet) | 2 | full |
| `countries nulByte` (quiet) | 2 | full |
| `countries tooManyRows` (quiet) | 2 | full |
| `countries unknownColumn` (quiet) | 2 | full |
| `countries wrongFile` (quiet) | 2 | full |
| `definitions nulByte` (quiet) | 2 | full |
| `definitions tooManyRows` (quiet) | 2 | full |
| `definitions unknownColumn` (quiet) | 2 | full |
| `links unknownColumn` (quiet) | 2 | full |
| `locations badHeader` (quiet) | 2 | full |
| `locations file too large` (quiet) | 2 | full |
| `locations nulByte` (quiet) | 2 | full |
| `locations unknownColumn` (quiet) | 2 | full |
| `locations wrongFile` (quiet) | 2 | full |
| `strings badHeader` (quiet) | 2 | full |
| `strings emptyFile` (quiet) | 2 | full |
| `strings nulByte` (quiet) | 2 | full |
| `strings tooManyRows` (quiet) | 2 | full |
| `strings unknownColumn` (quiet) | 2 | full |
| `strings wrongFile` (quiet) | 2 | full |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-cd<n>xt<n>: e<n>e_par_s<n>gk → e<n>e_chi_<n>bid` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-utymdx: e<n>e_par_hku<n>z<n> → e<n>e_chi_mcnjfg` (quiet) | 1 | full |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×9 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · category-images: no GEMINI_API_KEY — fake mode ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-cd<n>xt<n>: e<n>e_par_s<n>gk → e<n>e_chi_<n>bid ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-utymdx: e<n>e_par_hku<n>z<n> → e<n>e_chi_mcnjfg ×1

Off the allowlist:

### HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>

- Count: 178 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): SC-16 a reviewer without a fresh second factor cannot decide ×6 · SO-2 settings: confirmed sign-out empties the gated surface ×6 · the marketplace shell renders no English fallback ×6 · AU-11 own row: no edit form on your own record ×5 · SO-1 admin: one click signs out and resets to the marketplace ×5 · TR-7b sync after a step-up prompt still reports its counts @private-identity ×5

```text
[WebServer] [ssr-error] /api/listings/view HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
```

### listing not found

- Count: 3 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×1 · PW-5 the specification form is generated, its options load on the first tap, and ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: nightly, full · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: nightly, full · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-10-20T18:05:46.980Z | 3.5 min |
| full | 2026-10-20T18:09:20.006Z | 297.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-pricing.spec.ts` | 52 | 14.1 min | full |
| `post-wizard-specs.spec.ts` | 82 | 14.1 min | full |
| `admin-screening.spec.ts` | 52 | 13.1 min | full |
| `photo-pipeline.spec.ts` | 66 | 11.9 min | full |
| `post-wizard-place.spec.ts` | 38 | 11.3 min | full |
| `post-wizard-bundle2.spec.ts` | 70 | 11.1 min | full |
| `shell.spec.ts` | 212 | 10.0 min | full |
| `admin-listings.spec.ts` | 62 | 9.7 min | full |
| `post-wizard-category.spec.ts` | 48 | 9.0 min | full |
| `ad-page.spec.ts` | 68 | 8.7 min | full |
| `post-wizard-resets.spec.ts` | 34 | 8.4 min | full |
| `feed-screens.spec.ts` | 36 | 7.5 min | full |
| `admin-translations-console.spec.ts` | 46 | 7.0 min | full |
| `admin-users.spec.ts` | 28 | 6.9 min | full |
| `admin-attributes-library.spec.ts` | 42 | 6.8 min | full |
| `admin-categories-lifecycle.spec.ts` | 52 | 6.7 min | full |
| `posting-routes.spec.ts` | 80 | 6.4 min | full |
| `admin-translations-governance.spec.ts` | 20 | 6.3 min | full |
| `post-wizard-where.spec.ts` | 32 | 6.0 min | full |
| `admin-categories-console.spec.ts` | 34 | 5.7 min | full |
| `my-listings-ad.spec.ts` | 36 | 5.6 min | full |
| `import-security.spec.ts` | 36 | 5.6 min | full |
| `admin-locations.spec.ts` | 38 | 5.6 min | full |
| `admin-attributes-links.spec.ts` | 34 | 5.4 min | full |
| `admin-roles.spec.ts` | 26 | 4.9 min | full |
| `viewing-place.spec.ts` | 22 | 4.8 min | full |
| `auth-signout.spec.ts` | 28 | 4.8 min | full |
| `feed-index.spec.ts` | 30 | 4.7 min | full |
| `admin-attributes-editor.spec.ts` | 36 | 4.7 min | full |
| `my-listings-doors.spec.ts` | 28 | 3.8 min | full |
| `legal-certify.spec.ts` | 26 | 3.6 min | full |
| `admin-attributes-safety.spec.ts` | 18 | 3.5 min | full |
| `feed-route.spec.ts` | 22 | 3.4 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |
| `ad-page-doors.spec.ts` | 30 | 3.2 min | full |
| `admin-attributes-import.spec.ts` | 40 | 3.2 min | full |
| `my-listings-page.spec.ts` | 16 | 2.8 min | full |
| `legal-admin.spec.ts` | 28 | 2.7 min | full |
| `legal-doors.spec.ts` | 32 | 2.7 min | full |
| `admin-shell.spec.ts` | 12 | 2.6 min | full |
| `admin-countries.spec.ts` | 18 | 2.5 min | full |
| `breadcrumbs.spec.ts` | 6 | 2.4 min | full |
| `admin-audit.spec.ts` | 14 | 2.3 min | full |
| `admin-translations-data.spec.ts` | 8 | 2.3 min | full |
| `posting-routes-catalog.spec.ts` | 18 | 2.2 min | full |
| `admin-categories-home.spec.ts` | 10 | 2.1 min | full |
| `post-wizard-details.spec.ts` | 8 | 2.0 min | full |
| `post-wizard-removed.spec.ts` | 4 | 1.9 min | full |
| `post-wizard-finder.spec.ts` | 8 | 1.8 min | full |
| `mfa-stepup.spec.ts` | 18 | 1.7 min | full |
| `posting-routes-dials.spec.ts` | 18 | 1.3 min | full |
| `legal-accept.spec.ts` | 8 | 1.3 min | full |
| `admin-coverage.spec.ts` | 16 | 1.2 min | full |
| `admin-categories-images.spec.ts` | 4 | 1.1 min | full |
| `locations-tree.spec.ts` | 8 | 1.1 min | full |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | full |
| `phone-frame.spec.ts` | 18 | 1.0 min | full |
| `category-image-routes.spec.ts` | 10 | 1.0 min | full |
| `admin-services.spec.ts` | 10 | 0.7 min | full |
| `post-wizard-units.spec.ts` | 4 | 0.7 min | full |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | full |
| `legal-history.spec.ts` | 6 | 0.5 min | full |
| `posting-routes-identity.spec.ts` | 4 | 0.5 min | full |
| `i18n-coverage.spec.ts` | 14 | 0.5 min | full |
| `account-saved.spec.ts` | 4 | 0.5 min | full |
| `a11y.spec.ts` | 4 | 0.4 min | full |
| `primitives-law.spec.ts` | 24 | 0.4 min | full |
| `category-nav.spec.ts` | 10 | 0.4 min | full |
| `house-style.spec.ts` | 12 | 0.3 min | full |
| `settings.spec.ts` | 4 | 0.3 min | full |
| `rbac.spec.ts` | 6 | 0.3 min | full |
| `auth-reset.spec.ts` | 6 | 0.3 min | full |
| `layout.spec.ts` | 10 | 0.2 min | full |
| `legal-pages.spec.ts` | 6 | 0.2 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 204.7 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 144.4 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 105.9 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | desktop-1280 | 61.8 s |
| `breadcrumbs.spec.ts` › BR-1 the ad's page and its Edit: Home › Seller Centre › My listings › <title> › Edit, every segment but the current a link | mobile-360 | 60.1 s |
| `post-wizard-recent.spec.ts` › PW-171 two chips, most used first; a tap selects that leaf; drafts only draw none | desktop-1280 | 56.6 s |
| `post-wizard-pricing.spec.ts` › PW-17 the currency is preselected and searchable by name in one control | desktop-1280 | 52.4 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 51.6 s |
| `post-wizard-pricing.spec.ts` › PW-140 the title page opens with a title written from the answers, and the seller's edit survives a changed answer (bundle 4 step 12) | desktop-1280 | 44.0 s |
| `admin-screening.spec.ts` › SC-24 Photos to review: a failed photo on a live ad is listed with its reason, and Allow shows it to buyers (D178) | mobile-360 | 38.8 s |
| `admin-screening.spec.ts` › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188) | mobile-360 | 37.7 s |
| `admin-screening.spec.ts` › SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188) | mobile-360 | 37.5 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 36.5 s |
| `breadcrumbs.spec.ts` › BR-2 the panel's home, Post listing and Settings: Home › Seller Centre › My listings; Home › Seller Centre › Post listing; Home › Account › Settings | mobile-360 | 35.7 s |
| `post-wizard-place.spec.ts` › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored | desktop-1280 | 34.8 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39471610004-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 76 (pool 2, fresh 74)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 108 user(s) owned by process 39471610004-nightly
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-41 the page's remaining lines

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('listing-places-maps')
Expected pattern: /^https:\/\/www.google.com\/maps\/search\/\?api=1&query=/
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-places-maps')

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('listing-places-maps')
Expected pattern: /^https:\/\/www.google.com\/maps\/search\/\?api=1&query=/
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-places-maps')


  1256 |     await toggle.click();
  1257 |     await expect(toggle).toHaveAttribute("aria-expanded", "false");
> 1258 |     await expect(page.getByTestId("listing-places-maps")).toHaveAttribute(
       |                                                           ^
  1259 |       "href",
  1260 |       /^https:\/\/www.google.com\/maps\/search\/\?api=1&query=/,
  1261 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1258:59
```

Context:

```text
          - listitem [ref=e348]:
            - generic [ref=e349]: About
          - listitem [ref=e350]:
            - generic [ref=e351]: Contact
      - navigation "Help" [ref=e352]:
        - heading "Help" [level=2] [ref=e353]
        - list [ref=e354]:
          - listitem [ref=e355]:
            - generic [ref=e356]: Safety
      - navigation "Legal" [ref=e357]:
        - heading "Legal" [level=2] [ref=e358]
        - list [ref=e359]:
          - listitem [ref=e360]:
            - link "Terms" [ref=e361] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e362]:
            - link "Privacy" [ref=e363] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e365]: © 2026 ethio.com — All rights reserved.
```
```

## breadcrumbs.spec.ts › breadcrumbs — the seller's and the account's pages (D198) › BR-1 the ad's page and its Edit: Home › Seller Centre › My listings › <title> › Edit, every segment but the current a link

- Source: `full`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `breadcrumbs-breadcrumbs-the-seller-s-and-the-account-s-pages-D198-BR-1-the-ad-s-page-and-its-Edit-Home-Seller-Centre-My-listings-title-Edit-every-segment-but-the-current-a-link-mobile-360` — Playwright's name `breadcrumbs-breadcrumbs-—--e2357-ment-but-the-current-a-link-mobile-360`; this run carried 4 context file(s); of the same spec: none

## import-security.spec.ts › IMPORT-GATE attributes › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited

- Source: `full`
- Project: `mobile-360`

```text
Error: IMPORT-GATE the preview rate limit never engaged

expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 0
--- further error 1 ---
Error: IMPORT-GATE the preview rate limit never engaged

expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 0

  842 |         }
  843 |       }
> 844 |       expect(limited, "IMPORT-GATE the preview rate limit never engaged").toBe(1);
      |                                                                           ^
  845 |     });
  846 |
  847 |     /**
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/import-security.spec.ts:844:75
```

Context:

```text
          - listitem [ref=e1533]:
            - generic [ref=e1534]: About
          - listitem [ref=e1535]:
            - generic [ref=e1536]: Contact
      - navigation "Help" [ref=e1537]:
        - heading "Help" [level=2] [ref=e1538]
        - list [ref=e1539]:
          - listitem [ref=e1540]:
            - generic [ref=e1541]: Safety
      - navigation "Legal" [ref=e1542]:
        - heading "Legal" [level=2] [ref=e1543]
        - list [ref=e1544]:
          - listitem [ref=e1545]:
            - link "Terms" [ref=e1546] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e1547]:
            - link "Privacy" [ref=e1548] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e1550]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659)

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "1f996d2c-eef2-4985-b3a1-af594eaf4f00"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('post-where-city')

--- further error 1 ---
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "1f996d2c-eef2-4985-b3a1-af594eaf4f00"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('post-where-city')


  1130 |       await page.locator('[data-testid="post-review-edit"][data-step="6"]').click();
  1131 |       await expect(page.getByTestId("post-step-6")).toBeVisible({ timeout: 15000 });
> 1132 |       await expect(page.getByTestId("post-where-city")).toHaveValue(A.cityId, { timeout: 15000 });
       |                                                         ^
  1133 |       // The free plan allows one city: the seller changes the ad's place (INC-642).
  1134 |       await page.getByTestId("post-where-region").selectOption(second.region.id as string);
  1135 |       await page.getByTestId("post-where-city").selectOption(second.city.id as string);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1132:57
```

Context:

```text
          - listitem [ref=e348]:
            - generic [ref=e349]: About
          - listitem [ref=e350]:
            - generic [ref=e351]: Contact
      - navigation "Help" [ref=e352]:
        - heading "Help" [level=2] [ref=e353]
        - list [ref=e354]:
          - listitem [ref=e355]:
            - generic [ref=e356]: Safety
      - navigation "Legal" [ref=e357]:
        - heading "Legal" [level=2] [ref=e358]
        - list [ref=e359]:
          - listitem [ref=e360]:
            - link "Terms" [ref=e361] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e362]:
            - link "Privacy" [ref=e363] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e365]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "9150e8bc-6043-49ce-b6f1-2b22702f40f6"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('post-where-city')

--- further error 1 ---
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "9150e8bc-6043-49ce-b6f1-2b22702f40f6"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('post-where-city')


  1296 |     await expect(page.getByTestId("post-step-6")).toBeVisible({ timeout: 15000 });
  1297 |     const city = page.getByTestId("post-where-city");
> 1298 |     await expect(city).toHaveValue(A.cityId, { timeout: 15000 });
       |                        ^
  1299 |
  1300 |     // Another region, no city chosen: Save changes is drawn closed.
  1301 |     await page.getByTestId("post-where-region").selectOption(second.region.id as string);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1298:24
```

Context:

```text
          - listitem [ref=e337]:
            - generic [ref=e338]: About
          - listitem [ref=e339]:
            - generic [ref=e340]: Contact
      - navigation "Help" [ref=e341]:
        - heading "Help" [level=2] [ref=e342]
        - list [ref=e343]:
          - listitem [ref=e344]:
            - generic [ref=e345]: Safety
      - navigation "Legal" [ref=e346]:
        - heading "Legal" [level=2] [ref=e347]
        - list [ref=e348]:
          - listitem [ref=e349]:
            - link "Terms" [ref=e350] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e351]:
            - link "Privacy" [ref=e352] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e354]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "saving"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    14 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
       - unexpected value "saving"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "saving"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    14 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
       - unexpected value "saving"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
  158 |       // AUTO-ADVANCE: the leaf IS the answer; D39 — specifications open next.
  159 |       await expect(page.getByTestId("post-step-3")).toBeVisible();
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-17-the-currency-is-preselected-and-searchable-by-name-in-one-control-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-118f5-able-by-name-in-one-control-desktop-1280`; this run carried 4 context file(s); of the same spec: none

## Server errors: full

```text
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/locations/ET HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/assist HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/i18n/am HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/locations/ET HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/assist HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/media/photo-links HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/locations HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/media/photo-links HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
```

## Client errors: full

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-Brumwjqe.js:83:25) at http://127.0.0.1:4173/assets/feed-Brumwjqe.js:117:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-QN77mjlT.js:5125:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-QN77mjlT.js:6030:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-QN77mjlT.js:6021:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-QN77mjlT.js:6029:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-QN77mjlT.js:6021:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-QN77mjlT.js:6029:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-QN77mjlT.js:6021:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-QN77mjlT.js:6029:5)
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-QN77mjlT.js:15428:27 at getResponse (http://127.0.0.1:4173/assets/index-QN77mjlT.js:15471:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-QN77mjlT.js:15428:9) at async client (http://127.0.0.1:4173/assets/index-QN77mjlT.js:17476:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-QN77mjlT.js:17407:20) at async userNext (http://127.0.0.1:4173/assets/index-QN77mjlT.js:17393:21) ×3
```
