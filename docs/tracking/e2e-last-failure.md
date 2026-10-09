# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 37872325911 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37872325911
- Commit: `992b8eb3e0c35330dcd4fade296daca93eb2f352`
- Attempt: 1
- Written (UTC): 2026-10-09T02:24:35.094Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 2

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › mobile chrome › the menu closes back to the icons — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-countries.spec.ts › L2b countries console › CO-5 profile round trip: units, currency and order are saved and read back — Error: expect(received).toBe(expected) // Object.is equality

## Flaky bodies (DEC-078)

### shell.spec.ts › mobile chrome › the menu closes back to the icons

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-4-2-epqune')
Expected: "page"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-4-2-epqune')

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-4-2-epqune')
Expected: "page"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-4-2-epqune')


  1082 |     );
  1083 |     menu = await openRailScope(page);
> 1084 |     await expect(menu.getByTestId(testid)).toHaveAttribute("aria-current", "page");
       |                                            ^
  1085 |   });
  1086 |
  1087 |   test("the rail-collapse toggle does not exist on mobile", async ({ page }) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1084:44
```

Context:

```text
          - listitem [ref=e438]:
            - generic [ref=e439]: About
          - listitem [ref=e440]:
            - generic [ref=e441]: How it works
      - navigation "Help" [ref=e442]:
        - heading "Help" [level=2] [ref=e443]
        - list [ref=e444]:
          - listitem [ref=e445]:
            - generic [ref=e446]: Safety
          - listitem [ref=e447]:
            - generic [ref=e448]: Contact
      - navigation "Legal" [ref=e449]:
        - heading "Legal" [level=2] [ref=e450]
        - list [ref=e451]:
          - listitem [ref=e452]:
            - generic [ref=e453]: Terms
          - listitem [ref=e454]:
            - generic [ref=e455]: Privacy
    - paragraph [ref=e457]: © 2026 ethio.com — All rights reserved.
```
```

### admin-countries.spec.ts › L2b countries console › CO-5 profile round trip: units, currency and order are saved and read back

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "imperial"
Received: undefined

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "imperial"
Received: undefined

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  217 |       await stepUpIfPrompted(page, secret);
  218 |
> 219 |       await expect
      |       ^
  220 |         .poll(async () => (await readCountry(code))?.unit_system, { timeout: 20000 })
  221 |         .toBe("imperial");
  222 |       const row = await readCountry(code);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:219:7
```

Context:

```text
          - listitem [ref=e289]:
            - generic [ref=e290]: About
          - listitem [ref=e291]:
            - generic [ref=e292]: How it works
      - navigation "Help" [ref=e293]:
        - heading "Help" [level=2] [ref=e294]
        - list [ref=e295]:
          - listitem [ref=e296]:
            - generic [ref=e297]: Safety
          - listitem [ref=e298]:
            - generic [ref=e299]: Contact
      - navigation "Legal" [ref=e300]:
        - heading "Legal" [level=2] [ref=e301]
        - list [ref=e302]:
          - listitem [ref=e303]:
            - generic [ref=e304]: Terms
          - listitem [ref=e305]:
            - generic [ref=e306]: Privacy
    - paragraph [ref=e308]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

105 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 5 | shard 2, shard 3, shard 5, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>oysq<n>: e<n>e_par_f<n>uvi → e<n>e_chi_xhicut` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-c<n>fqym: e<n>e_par_<n>v<n>nh → e<n>e_chi_xopg<n>m` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>oysq<n>: e<n>e_par_f<n>uvi → e<n>e_chi_xhicut ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-c<n>fqym: e<n>e_par_<n>v<n>nh → e<n>e_chi_xopg<n>m ×1

Off the allowlist:

### listing not found

- Count: 5 · Sources: shard 2, shard 3, shard 5, shard 6

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
| smoke | 2026-10-09T01:59:43.090Z | 14.8 min |
| email | 2026-10-09T01:59:40.116Z | 0.2 min |
| shard 1 | 2026-10-09T01:59:37.917Z | 23.9 min |
| shard 2 | 2026-10-09T01:59:43.630Z | 18.6 min |
| shard 3 | 2026-10-09T01:59:38.813Z | 19.9 min |
| shard 4 | 2026-10-09T01:59:58.804Z | 24.3 min |
| shard 5 | 2026-10-09T01:59:42.478Z | 23.7 min |
| shard 6 | 2026-10-09T01:59:40.983Z | 18.1 min |
| changed | 2026-10-09T01:59:45.878Z | 7.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 504 | 30.6 min | smoke, shard 3, shard 6, changed |
| `post-wizard-specs.spec.ts` | 78 | 23.2 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 15.2 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 30 | 10.6 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 10.6 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 48 | 10.6 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 10.4 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 9.9 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 42 | 9.9 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 9.6 min | shard 3, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 9.0 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 8.8 min | smoke, shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 8.7 min | shard 3, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.0 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 8.0 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 7.8 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.0 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 24 | 5.9 min | shard 1, shard 5 |
| `admin-locations.spec.ts` | 36 | 5.7 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.7 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 5.2 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.1 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 14 | 5.0 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.5 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 3.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 2.9 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 8 | 2.7 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 2.7 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.1 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.1 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.0 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 4 | 1.7 min | shard 3, shard 5, changed |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 1.6 min | shard 3, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.3 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 1.2 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `house-style.spec.ts` | 24 | 0.7 min | shard 2, shard 5, changed |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 4, shard 6 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `posting-routes-identity.spec.ts` | 2 | 0.5 min | shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 52.6 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 45.7 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 44.8 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 44.1 s |
| `admin-attributes-library.spec.ts` › AT-3 link manager: an attribute is linked to a scratch category and unlinked | desktop-1280 | 43.5 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 42.7 s |
| `admin-countries.spec.ts` › CO-5 profile round trip: units, currency and order are saved and read back | desktop-1280 | 41.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 40.7 s |
| `admin-attributes-editor.spec.ts` › AT-58 a rank swap within one category imports through the route | mobile-360 | 39.6 s |
| `post-wizard-recent.spec.ts` › PW-171 two chips, most used first; a tap selects that leaf; drafts only draw none | desktop-1280 | 39.0 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 38.3 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 38.3 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 36.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 36.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.9 s |
