# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39624675249 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39624675249
- Commit: `63242a6baf4de76be3ff4664c1861183335ab1f2`
- Attempt: 1
- Written (UTC): 2026-10-21T15:36:51.196Z
- Post-test warnings: 54
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width — Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Ephrwmgnnauacbjfhdzbdeefsptnqylqmdezkkailpzhddor","furthestElement":"breadcrumb-ad","crumbHeight":20}

## Flaky bodies (DEC-078)

### ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Ephrwmgnnauacbjfhdzbdeefsptnqylqmdezkkailpzhddor","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Ephrwmgnnauacbjfhdzbdeefsptnqylqmdezkkailpzhddor","furthestElement":"breadcrumb-ad","crumbHeight":20}

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
          - listitem [ref=e250]:
            - generic [ref=e251]: About
          - listitem [ref=e252]:
            - generic [ref=e253]: Contact
      - navigation "Help" [ref=e254]:
        - heading "Help" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - generic [ref=e258]: Safety
      - navigation "Legal" [ref=e259]:
        - heading "Legal" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - link "Terms" [ref=e263] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e264]:
            - link "Privacy" [ref=e265] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e267]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 18 results files read, 18 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

115 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 15 | shard 1, shard 4, shard 9, shard 12 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 9, shard 10, shard 12 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 6 | shard 1, shard 2, shard 4, shard 9, shard 10, shard 11 |
| `listing not found` | 6 | shard 7, shard 14, shard 15 |
| `categories badHeader` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `categories wrongFile` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 9 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 2, shard 9, shard 10 |
| `categories file too large` (quiet) | 2 | shard 4, shard 12 |
| `categories nulByte` (quiet) | 2 | shard 4, shard 12 |
| `categories unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 2, shard 10 |
| `countries badHeader` (quiet) | 2 | shard 4, shard 12 |
| `countries nulByte` (quiet) | 2 | shard 4, shard 12 |
| `countries tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `countries unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `countries wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `definitions nulByte` (quiet) | 2 | shard 4, shard 12 |
| `definitions tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `definitions unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `links unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `locations badHeader` (quiet) | 2 | shard 4, shard 12 |
| `locations file too large` (quiet) | 2 | shard 4, shard 12 |
| `locations nulByte` (quiet) | 2 | shard 4, shard 12 |
| `locations unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `locations wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `new row for relation <q> violates check constraint <q>` | 2 | shard 6, shard 14 |
| `strings badHeader` (quiet) | 2 | shard 4, shard 12 |
| `strings emptyFile` (quiet) | 2 | shard 4, shard 12 |
| `strings nulByte` (quiet) | 2 | shard 4, shard 12 |
| `strings tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `strings unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `strings wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>k<n>de: e<n>e_par_t<n>scc → e<n>e_chi_<n>zxvpt` (quiet) | 1 | shard 2 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-imzo<n>u: e<n>e_par_<n>np<n>df → e<n>e_chi_nna<n>l` (quiet) | 1 | shard 10 |

Quiet (allowlisted): too many previews ×15 · digest mismatch ×12 · category-images: no GEMINI_API_KEY — fake mode ×6 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>k<n>de: e<n>e_par_t<n>scc → e<n>e_chi_<n>zxvpt ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-imzo<n>u: e<n>e_par_<n>np<n>df → e<n>e_chi_nna<n>l ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 7, shard 14, shard 15
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2 · PW-188 a list that hangs under another answer offers its shared Other last under ×2 · PW-21 a child detail shows only the chosen parent's options and clears on change ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×1 · PW-49 a prefill-only fact keeps its input while a settled one does not ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### new row for relation <q> violates check constraint <q>

- Count: 2 · Sources: shard 6, shard 14
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-61 a category change resets details, title, description and price, and Undo w ×2 · PW-73 the door's currency fill is mirrored, so Undo restores a complete price (I ×2

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-21T15:22:56.016Z | 12.1 min |
| email | 2026-10-21T15:22:31.414Z | 0.2 min |
| shard 1 | 2026-10-21T15:22:56.394Z | 10.5 min |
| shard 2 | 2026-10-21T15:22:31.728Z | 12.4 min |
| shard 3 | 2026-10-21T15:24:24.969Z | 11.6 min |
| shard 4 | 2026-10-21T15:22:37.144Z | 5.6 min |
| shard 5 | 2026-10-21T15:22:52.036Z | 6.6 min |
| shard 6 | 2026-10-21T15:23:24.881Z | 10.5 min |
| shard 7 | 2026-10-21T15:22:51.171Z | 8.1 min |
| shard 8 | 2026-10-21T15:22:48.352Z | 7.7 min |
| shard 9 | 2026-10-21T15:22:45.573Z | 9.9 min |
| shard 10 | 2026-10-21T15:22:44.173Z | 13.3 min |
| shard 11 | 2026-10-21T15:22:46.327Z | 13.0 min |
| shard 12 | 2026-10-21T15:24:20.031Z | 7.2 min |
| shard 13 | 2026-10-21T15:22:53.123Z | 11.6 min |
| shard 14 | 2026-10-21T15:25:11.651Z | 8.0 min |
| shard 15 | 2026-10-21T15:22:34.349Z | 6.4 min |
| shard 16 | 2026-10-21T15:23:10.939Z | 7.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 19.0 min | smoke, shard 8, shard 16 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.9 min | shard 6, shard 13 |
| `admin-attributes-library.spec.ts` | 42 | 5.8 min | shard 1, shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 5.4 min | shard 7, shard 15 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 4, shard 12 |
| `admin-translations-console.spec.ts` | 44 | 4.7 min | shard 3, shard 11 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 2, shard 10 |
| `post-wizard-place.spec.ts` | 38 | 4.5 min | shard 6, shard 14 |
| `admin-categories-console.spec.ts` | 34 | 4.5 min | shard 2, shard 10 |
| `auth-signout.spec.ts` | 56 | 4.2 min | smoke, shard 3, shard 11 |
| `admin-screening.spec.ts` | 52 | 4.2 min | shard 3, shard 11 |
| `admin-roles.spec.ts` | 26 | 4.2 min | shard 3, shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 4.1 min | shard 1, shard 9 |
| `photo-pipeline.spec.ts` | 66 | 4.1 min | shard 5, shard 13 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `post-wizard-where.spec.ts` | 32 | 4.0 min | shard 7, shard 15 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 3, shard 11 |
| `my-listings-ad.spec.ts` | 36 | 3.7 min | shard 5, shard 13 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.6 min | shard 2, shard 10 |
| `admin-listings.spec.ts` | 62 | 3.6 min | shard 2, shard 10 |
| `ad-page.spec.ts` | 68 | 3.6 min | shard 1, shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 3.6 min | shard 6, shard 14 |
| `admin-attributes-editor.spec.ts` | 36 | 3.5 min | shard 1, shard 9 |
| `posting-routes.spec.ts` | 80 | 3.0 min | shard 7, shard 15 |
| `post-wizard-category.spec.ts` | 48 | 2.8 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.7 min | shard 2, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.7 min | shard 6, shard 14 |
| `import-security.spec.ts` | 36 | 2.2 min | shard 4, shard 12 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `admin-attributes-import.spec.ts` | 40 | 2.1 min | shard 1, shard 9 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `mfa-stepup.spec.ts` | 18 | 1.8 min | shard 5, shard 13 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 8 | 1.6 min | shard 3, shard 11 |
| `legal-certify.spec.ts` | 40 | 1.5 min | shard 4, shard 12 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 2, shard 10 |
| `legal-admin.spec.ts` | 36 | 1.4 min | shard 4, shard 12 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `my-listings-page.spec.ts` | 16 | 0.9 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 3, shard 11 |
| `legal-doors.spec.ts` | 32 | 0.8 min | shard 5, shard 13 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 10 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 7, shard 15 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `ad-page-doors.spec.ts` | 30 | 0.6 min | shard 1, shard 9 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `posting-routes-dials.spec.ts` | 18 | 0.4 min | shard 7, shard 15 |
| `legal-accept.spec.ts` | 8 | 0.4 min | shard 4, shard 12 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 8, shard 15 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 4, shard 11 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 5, shard 13 |
| `legal-pages.spec.ts` | 6 | 0.3 min | shard 5, shard 13 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 3, shard 11 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `settings.spec.ts` | 4 | 0.2 min | shard 8 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `auth-signup.spec.ts` | 4 | 0.2 min | email |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 7, shard 15 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 6, shard 14 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 4, shard 11 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 38.3 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 32.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.7 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 31.1 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.6 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 25.7 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 25.6 s |
