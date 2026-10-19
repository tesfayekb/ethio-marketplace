# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39299556256
- Commit: `ab6f1744ee8d4266622738edf77eb0bf861d344c`
- Attempt: 1
- Written (UTC): 2026-10-19T22:58:09.627Z
- Passed: 1927 · Skipped: 98 · Failed: 5
- Gating failures: 5 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (2 of 2 results files read, 2 of 2 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

324 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>` | 225 | full |
| `digest mismatch` (quiet) | 12 | full |
| `too many previews` (quiet) | 10 | full |
| `categories badHeader` (quiet) | 4 | full |
| `categories wrongFile` (quiet) | 4 | full |
| `definitions badHeader` (quiet) | 4 | full |
| `definitions wrongFile` (quiet) | 4 | full |
| `export_failed permission denied` (quiet) | 4 | full |
| `preview_failed permission denied` (quiet) | 4 | full |
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
| `listing not found` | 2 | full |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-fls<n>kp: e<n>e_par_c<n>rs → e<n>e_chi_m<n>jn<n>y` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-ni<n>pqp: e<n>e_par_det<n>xw → e<n>e_chi_t<n>ij<n>` (quiet) | 1 | full |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · category-images: no GEMINI_API_KEY — fake mode ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-fls<n>kp: e<n>e_par_c<n>rs → e<n>e_chi_m<n>jn<n>y ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-ni<n>pqp: e<n>e_par_det<n>xw → e<n>e_chi_t<n>ij<n> ×1

Off the allowlist:

### HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>

- Count: 225 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PN-2 recent own picks and the saved place's descendants show no notice ×9 · AP-40 an address never reveals: only the visitor's own tap does (D201 §14) ×6 · AP-41 the page's remaining lines ×6 · PN-1 an old own choice offers an unrelated same-market place, Keep and Switch ×6 · SB-1 the search field takes three quarters of the band's free space, up to 42rem ×6 · FF-1 every text field is at least 16 px on a phone ×5

```text
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
```

### listing not found

- Count: 2 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2

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
| nightly | 2026-10-19T18:05:52.923Z | 3.5 min |
| full | 2026-10-19T18:09:25.942Z | 288.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `posting-routes.spec.ts` | 80 | 15.4 min | full |
| `photo-pipeline.spec.ts` | 66 | 14.3 min | full |
| `shell.spec.ts` | 212 | 12.7 min | full |
| `admin-listings.spec.ts` | 62 | 11.6 min | full |
| `post-wizard-specs.spec.ts` | 82 | 11.5 min | full |
| `post-wizard-bundle2.spec.ts` | 70 | 10.8 min | full |
| `admin-screening.spec.ts` | 52 | 10.5 min | full |
| `ad-page.spec.ts` | 68 | 10.4 min | full |
| `post-wizard-pricing.spec.ts` | 52 | 8.2 min | full |
| `admin-categories-lifecycle.spec.ts` | 52 | 7.1 min | full |
| `post-wizard-place.spec.ts` | 38 | 7.1 min | full |
| `admin-attributes-library.spec.ts` | 42 | 6.9 min | full |
| `admin-translations-governance.spec.ts` | 20 | 6.7 min | full |
| `post-wizard-where.spec.ts` | 32 | 6.7 min | full |
| `viewing-place.spec.ts` | 22 | 6.6 min | full |
| `post-wizard-category.spec.ts` | 48 | 6.2 min | full |
| `my-listings-ad.spec.ts` | 36 | 6.1 min | full |
| `post-wizard-resets.spec.ts` | 34 | 5.9 min | full |
| `feed-screens.spec.ts` | 36 | 5.9 min | full |
| `posting-routes-catalog.spec.ts` | 18 | 5.9 min | full |
| `admin-categories-console.spec.ts` | 34 | 5.8 min | full |
| `admin-attributes-links.spec.ts` | 34 | 5.8 min | full |
| `admin-translations-console.spec.ts` | 46 | 5.6 min | full |
| `admin-locations.spec.ts` | 38 | 5.5 min | full |
| `admin-users.spec.ts` | 28 | 5.2 min | full |
| `admin-attributes-editor.spec.ts` | 36 | 4.9 min | full |
| `my-listings-doors.spec.ts` | 28 | 4.9 min | full |
| `admin-roles.spec.ts` | 26 | 4.8 min | full |
| `ad-page-doors.spec.ts` | 30 | 4.6 min | full |
| `import-security.spec.ts` | 36 | 4.0 min | full |
| `admin-attributes-safety.spec.ts` | 18 | 3.9 min | full |
| `admin-attributes-import.spec.ts` | 40 | 3.6 min | full |
| `my-listings-page.spec.ts` | 16 | 3.6 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |
| `auth-signout.spec.ts` | 28 | 3.3 min | full |
| `posting-routes-dials.spec.ts` | 18 | 3.2 min | full |
| `legal-certify.spec.ts` | 24 | 3.2 min | full |
| `feed-index.spec.ts` | 30 | 2.7 min | full |
| `legal-doors.spec.ts` | 28 | 2.6 min | full |
| `admin-countries.spec.ts` | 18 | 2.5 min | full |
| `admin-audit.spec.ts` | 14 | 2.3 min | full |
| `admin-categories-home.spec.ts` | 10 | 2.2 min | full |
| `feed-route.spec.ts` | 22 | 2.2 min | full |
| `admin-translations-data.spec.ts` | 8 | 2.0 min | full |
| `mfa-stepup.spec.ts` | 18 | 1.7 min | full |
| `admin-shell.spec.ts` | 12 | 1.6 min | full |
| `legal-admin.spec.ts` | 16 | 1.3 min | full |
| `admin-coverage.spec.ts` | 16 | 1.3 min | full |
| `posting-routes-identity.spec.ts` | 4 | 1.2 min | full |
| `post-wizard-removed.spec.ts` | 4 | 1.1 min | full |
| `locations-tree.spec.ts` | 8 | 1.1 min | full |
| `post-wizard-details.spec.ts` | 8 | 1.1 min | full |
| `admin-categories-images.spec.ts` | 4 | 1.1 min | full |
| `post-wizard-finder.spec.ts` | 8 | 1.0 min | full |
| `legal-accept.spec.ts` | 8 | 0.8 min | full |
| `phone-frame.spec.ts` | 18 | 0.8 min | full |
| `breadcrumbs.spec.ts` | 6 | 0.8 min | full |
| `legal-history.spec.ts` | 6 | 0.7 min | full |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | full |
| `account-saved.spec.ts` | 4 | 0.6 min | full |
| `category-image-routes.spec.ts` | 10 | 0.6 min | full |
| `rbac.spec.ts` | 6 | 0.5 min | full |
| `post-wizard-units.spec.ts` | 4 | 0.5 min | full |
| `i18n-coverage.spec.ts` | 14 | 0.5 min | full |
| `admin-services.spec.ts` | 10 | 0.4 min | full |
| `a11y.spec.ts` | 4 | 0.4 min | full |
| `post-wizard-recent.spec.ts` | 2 | 0.4 min | full |
| `settings.spec.ts` | 4 | 0.3 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.3 min | full |
| `primitives-law.spec.ts` | 24 | 0.3 min | full |
| `house-style.spec.ts` | 12 | 0.2 min | full |
| `category-nav.spec.ts` | 10 | 0.2 min | full |
| `auth-reset.spec.ts` | 6 | 0.2 min | full |
| `legal-pages.spec.ts` | 6 | 0.2 min | full |
| `layout.spec.ts` | 10 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 212.5 s |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 205.3 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 86.7 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 47.7 s |
| `posting-routes-identity.spec.ts` › PR-26 the imitation check is rate-gated before the model is asked | desktop-1280 | 40.5 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 39.7 s |
| `posting-routes.spec.ts` › PR-48 the writing helper spends only its caller's own listing's tries | desktop-1280 | 38.8 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 38.6 s |
| `posting-routes-catalog.spec.ts` › PR-41 the door refuses an answer the chosen options do not allow | desktop-1280 | 38.1 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 36.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 35.1 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 35.0 s |
| `posting-routes.spec.ts` › PR-24 a seller without a public name, or a person without a first name, is refused at publish (INC-423) | desktop-1280 | 34.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.3 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39299556256-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 76 (pool 2, fresh 74)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 108 user(s) owned by process 39299556256-nightly
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-41 the page's remaining lines

- Source: `full`
- Project: `mobile-360`

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


  1252 |     await toggle.click();
  1253 |     await expect(toggle).toHaveAttribute("aria-expanded", "false");
> 1254 |     await expect(page.getByTestId("listing-places-maps")).toHaveAttribute(
       |                                                           ^
  1255 |       "href",
  1256 |       /^https:\/\/www.google.com\/maps\/search\/\?api=1&query=/,
  1257 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1254:59
```

Context:

```text
          - listitem [ref=e276]:
            - generic [ref=e277]: About
          - listitem [ref=e278]:
            - generic [ref=e279]: Contact
      - navigation "Help" [ref=e280]:
        - heading "Help" [level=2] [ref=e281]
        - list [ref=e282]:
          - listitem [ref=e283]:
            - generic [ref=e284]: Safety
      - navigation "Legal" [ref=e285]:
        - heading "Legal" [level=2] [ref=e286]
        - list [ref=e287]:
          - listitem [ref=e288]:
            - link "Terms" [ref=e289] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e290]:
            - link "Privacy" [ref=e291] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e293]: © 2026 ethio.com — All rights reserved.
```
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


  1252 |     await toggle.click();
  1253 |     await expect(toggle).toHaveAttribute("aria-expanded", "false");
> 1254 |     await expect(page.getByTestId("listing-places-maps")).toHaveAttribute(
       |                                                           ^
  1255 |       "href",
  1256 |       /^https:\/\/www.google.com\/maps\/search\/\?api=1&query=/,
  1257 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1254:59
```

Context:

```text
          - listitem [ref=e332]:
            - generic [ref=e333]: About
          - listitem [ref=e334]:
            - generic [ref=e335]: Contact
      - navigation "Help" [ref=e336]:
        - heading "Help" [level=2] [ref=e337]
        - list [ref=e338]:
          - listitem [ref=e339]:
            - generic [ref=e340]: Safety
      - navigation "Legal" [ref=e341]:
        - heading "Legal" [level=2] [ref=e342]
        - list [ref=e343]:
          - listitem [ref=e344]:
            - link "Terms" [ref=e345] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e346]:
            - link "Privacy" [ref=e347] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e349]: © 2026 ethio.com — All rights reserved.
```
```

## legal-certify.spec.ts › Legal certification › LG-21 the statement is certified once per ad: edits, renewals and photos ask again only for a new version

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "certificationRequired"
Received string:    "an ad in review is edited once its review is done"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "certificationRequired"
Received string:    "an ad in review is edited once its review is done"

  662 |     const changes = { title: `e2e once changed ${rand()}` };
  663 |     const bare = await me.rpc("edit_my_listing", { p_listing_id: a, p_changes: changes });
> 664 |     expect(bare.error).toContain("certificationRequired");
      |                        ^
  665 |     const certified = await me.rpc("edit_my_listing", {
  666 |       p_listing_id: a,
  667 |       p_changes: changes,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:664:24
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

## legal-certify.spec.ts › Legal certification › LG-21 the statement is certified once per ad: edits, renewals and photos ask again only for a new version

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "certificationRequired"
Received string:    "an ad in review is edited once its review is done"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "certificationRequired"
Received string:    "an ad in review is edited once its review is done"

  662 |     const changes = { title: `e2e once changed ${rand()}` };
  663 |     const bare = await me.rpc("edit_my_listing", { p_listing_id: a, p_changes: changes });
> 664 |     expect(bare.error).toContain("certificationRequired");
      |                        ^
  665 |     const certified = await me.rpc("edit_my_listing", {
  666 |       p_listing_id: a,
  667 |       p_changes: changes,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:664:24
```

Context:

```text
          - listitem [ref=e305]:
            - generic [ref=e306]: About
          - listitem [ref=e307]:
            - generic [ref=e308]: Contact
      - navigation "Help" [ref=e309]:
        - heading "Help" [level=2] [ref=e310]
        - list [ref=e311]:
          - listitem [ref=e312]:
            - generic [ref=e313]: Safety
      - navigation "Legal" [ref=e314]:
        - heading "Legal" [level=2] [ref=e315]
        - list [ref=e316]:
          - listitem [ref=e317]:
            - link "Terms" [ref=e318] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e319]:
            - link "Privacy" [ref=e320] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e322]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-132 a non-Latin seller name shows the Latin line as the refusal

- Source: `full`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-snightlyb-000@ethio-e2e.invalid (alias history) failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>

--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-snightlyb-000@ethio-e2e.invalid (alias history) failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>


   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:276:22)
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-132-a-non-Latin-seller-name-shows-the-Latin-line-as-the-refusal-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-c7d96-e-Latin-line-as-the-refusal-mobile-360`; this run carried 4 context file(s); of the same spec: none

## Server errors: full

```text
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
```

## Client errors: full

No `[client-error]` lines in the `full` log (or no log was uploaded).
