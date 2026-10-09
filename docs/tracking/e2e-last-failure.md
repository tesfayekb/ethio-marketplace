# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 37906384127 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37906384127
- Commit: `0a0a76874358ec5af33d240ba76ca426d69ccfed`
- Attempt: 1
- Written (UTC): 2026-10-09T09:11:29.713Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 3

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-144 leaving the contact step makes one identity call, or none when nothing changed — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-countries.spec.ts › L2b countries console › CO-2 roster: every market renders, the two open ones carry the open tone, search and the status filter narrow — Error: expect(received).toBe(expected) // Object.is equality
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) — TypeError: fetch failed

## Flaky bodies (DEC-078)

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-144 leaving the contact step makes one identity call, or none when nothing changed

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')


  1407 |       const mark = calls.length;
  1408 |       await page.getByTestId("post-next").click();
> 1409 |       await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
       |                                                     ^
  1410 |       expect(calls.length - mark, `PW-144: pass ${pass} with nothing changed called identity`).toBe(
  1411 |         0,
  1412 |       );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1409:53
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-144-leaving-the-contact-step-makes-one-identity-call-or-none-when-nothing-changed-mobile-360`

### admin-countries.spec.ts › L2b countries console › CO-2 roster: every market renders, the two open ones carry the open tone, search and the status filter narrow

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  88 |     // pagination total must name the number of market rows the service client
  89 |     // counts, and it is read BEFORE any needle narrows the roster.
> 90 |     await expect
     |     ^
  91 |       .poll(
  92 |         async () => {
  93 |           const text = await page.getByTestId("country-pagination").innerText();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:90:5
```

Context:

```text
          - listitem [ref=e850]:
            - generic [ref=e851]: About
          - listitem [ref=e852]:
            - generic [ref=e853]: How it works
      - navigation "Help" [ref=e854]:
        - heading "Help" [level=2] [ref=e855]
        - list [ref=e856]:
          - listitem [ref=e857]:
            - generic [ref=e858]: Safety
          - listitem [ref=e859]:
            - generic [ref=e860]: Contact
      - navigation "Legal" [ref=e861]:
        - heading "Legal" [level=2] [ref=e862]
        - list [ref=e863]:
          - listitem [ref=e864]:
            - generic [ref=e865]: Terms
          - listitem [ref=e866]:
            - generic [ref=e867]: Privacy
    - paragraph [ref=e869]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081)

- Source: `shard 5`
- Project: `desktop-1280`

```text
TypeError: fetch failed
--- further error 1 ---
TypeError: fetch failed

   at global-setup.ts:222

  220 |   init: { method: string; body?: unknown; accessToken?: string },
  221 | ): Promise<Record<string, unknown>> {
> 222 |   const response = await fetch(`${authBaseUrl()}${path}`, {
      |                    ^
  223 |     method: init.method,
  224 |     headers: {
  225 |       "content-type": "application/json",
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:222:20)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:373:3)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:385:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:125:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:578:18
[cause]: Error: read ECONNRESET
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-64-the-negotiable-toggle-stores-the-flag-shows-a-badge-on-review-and-a-contact-price-clears-it-DEC-081-desktop-1280`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

115 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 11 | shard 2, shard 3, shard 6, changed |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 4 | shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ayxkhd: e<n>e_par_mfvii<n> → e<n>e_chi_<n>fm<n>zr` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-upki<n>w: e<n>e_par_rq<n>y<n>u → e<n>e_chi_ic<n>wy` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ayxkhd: e<n>e_par_mfvii<n> → e<n>e_chi_<n>fm<n>zr ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-upki<n>w: e<n>e_par_rq<n>y<n>u → e<n>e_chi_ic<n>wy ×1

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 2, shard 3, shard 6, changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 4 · Sources: shard 5

```text
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-09T08:41:39.018Z | 15.4 min |
| email | 2026-10-09T08:41:34.212Z | 0.2 min |
| shard 1 | 2026-10-09T08:43:52.515Z | 27.4 min |
| shard 2 | 2026-10-09T08:41:28.675Z | 24.1 min |
| shard 3 | 2026-10-09T08:41:36.691Z | 24.5 min |
| shard 4 | 2026-10-09T08:41:45.528Z | 26.7 min |
| shard 5 | 2026-10-09T08:43:59.948Z | 25.3 min |
| shard 6 | 2026-10-09T08:41:32.583Z | 23.6 min |
| changed | 2026-10-09T08:41:42.392Z | 18.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 504 | 30.5 min | smoke, shard 3, shard 6, changed |
| `post-wizard-pricing.spec.ts` | 100 | 28.0 min | shard 2, shard 5, changed |
| `post-wizard-specs.spec.ts` | 78 | 27.6 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 18.6 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 13.9 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 30 | 12.2 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 48 | 11.9 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 42 | 11.4 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 40 | 11.2 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 50 | 11.1 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 10.7 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 8.7 min | smoke, shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 30 | 8.6 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 8.4 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.3 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 24 | 8.1 min | shard 2, shard 5, changed |
| `posting-routes-catalog.spec.ts` | 18 | 7.8 min | shard 3, shard 6 |
| `admin-locations.spec.ts` | 36 | 7.2 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.0 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 7.0 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 6.5 min | shard 2, shard 5 |
| `import-security.spec.ts` | 34 | 6.0 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 14 | 5.3 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 38 | 5.3 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 5.1 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 24 | 5.0 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 4.1 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 3.6 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 3.5 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 10 | 3.1 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 8 | 3.0 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 10 | 2.3 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.2 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.1 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.0 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.0 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.6 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 1.5 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 4, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 1 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 57.7 s |
| `post-wizard-bundle2.spec.ts` › PW-144 leaving the contact step makes one identity call, or none when nothing changed | mobile-360 | 53.5 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 51.9 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 48.5 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 45.7 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 45.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 45.3 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 44.5 s |
| `feed-screens.spec.ts` › FS-4 nothing in the chosen place: the note, then the wider place | desktop-1280 | 43.0 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 42.6 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 41.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 41.0 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 41.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 40.9 s |
| `post-wizard-pricing.spec.ts` › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) | mobile-360 | 40.8 s |
