# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 37582177651 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37582177651
- Commit: `549cfcfb93247549c6721f8a6f6041f3c34eb505`
- Attempt: 2
- Written (UTC): 2026-10-07T07:09:11.295Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · category-nav.spec.ts › category selection navigates › C-5: the rail follows root pointer order, and a pointer reorder reaches it — Error: C-5 the rail did not flip after the pointer swap

## Flaky bodies (DEC-078)

### category-nav.spec.ts › category selection navigates › C-5: the rail follows root pointer order, and a pointer reorder reaches it

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: C-5 the rail did not flip after the pointer swap

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: C-5 the rail did not flip after the pointer swap

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

  177 |       }
  178 |
> 179 |       await expect
      |       ^
  180 |         .poll(
  181 |           async () => {
  182 |             await page.reload();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/category-nav.spec.ts:179:7
```

Context:

```text
          - listitem [ref=e254]:
            - generic [ref=e255]: About
          - listitem [ref=e256]:
            - generic [ref=e257]: How it works
      - navigation "Help" [ref=e258]:
        - heading "Help" [level=2] [ref=e259]
        - list [ref=e260]:
          - listitem [ref=e261]:
            - generic [ref=e262]: Safety
          - listitem [ref=e263]:
            - generic [ref=e264]: Contact
      - navigation "Legal" [ref=e265]:
        - heading "Legal" [level=2] [ref=e266]
        - list [ref=e267]:
          - listitem [ref=e268]:
            - generic [ref=e269]: Terms
          - listitem [ref=e270]:
            - generic [ref=e271]: Privacy
    - paragraph [ref=e273]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

123 line(s), 38 message(s): 1 off the allowlist, 37 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 14 | shard 1, shard 2, shard 4, shard 5, changed |
| `listing not found` | 10 | shard 3, shard 5, shard 6 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 6 | shard 1, shard 2, shard 4, shard 5, changed |
| `categories wrongFile` (quiet) | 6 | shard 1, shard 2, shard 4, shard 5, changed |
| `preview_failed permission denied` (quiet) | 6 | shard 1, shard 4, changed |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 5 | shard 1, shard 2, shard 4, shard 5, changed |
| `commit_failed step-up required: no verified factor` (quiet) | 4 | shard 1, shard 4, changed |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-krx<n>o<n>: e<n>e_par_fwtiuc → e<n>e_chi_l<n>ye<n>n` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-o<n>iq<n>t: e<n>e_par_bnf<n> → e<n>e_chi_<n>k<n>wxg` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-changed-<n>-asd<n>qq: e<n>e_par_<n>rev<n> → e<n>e_chi_x<n>q<n>o` (quiet) | 1 | changed |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-changed-<n>-oidw<n>: e<n>e_par_e<n>vnf → e<n>e_chi_<n>ee<n>v<n>` (quiet) | 1 | changed |

Quiet (allowlisted): digest mismatch ×14 · too many previews ×10 · categories badHeader ×6 · categories wrongFile ×6 · preview_failed permission denied ×6 · category-images: no GEMINI_API_KEY — fake mode ×5 · commit_failed step-up required: no verified factor ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-krx<n>o<n>: e<n>e_par_fwtiuc → e<n>e_chi_l<n>ye<n>n ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-o<n>iq<n>t: e<n>e_par_bnf<n> → e<n>e_chi_<n>k<n>wxg ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-changed-<n>-asd<n>qq: e<n>e_par_<n>rev<n> → e<n>e_chi_x<n>q<n>o ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-changed-<n>-oidw<n>: e<n>e_par_e<n>vnf → e<n>e_chi_<n>ee<n>v<n> ×1

Off the allowlist:

### listing not found

- Count: 10 · Sources: shard 3, shard 5, shard 6

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
| smoke | 2026-10-07T06:37:21.340Z | 16.2 min |
| email | 2026-10-07T06:37:19.551Z | 0.1 min |
| shard 1 | 2026-10-07T06:37:26.600Z | 27.5 min |
| shard 2 | 2026-10-07T06:37:25.079Z | 28.8 min |
| shard 3 | 2026-10-07T06:37:30.445Z | 23.7 min |
| shard 4 | 2026-10-07T06:37:31.825Z | 31.3 min |
| shard 5 | 2026-10-07T06:37:23.995Z | 28.5 min |
| shard 6 | 2026-10-07T06:37:22.023Z | 23.5 min |
| changed | 2026-10-07T06:37:32.499Z | 23.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` | 96 | 33.4 min | shard 1, shard 4, changed |
| `post-wizard-specs.spec.ts` | 78 | 30.1 min | shard 3, shard 6 |
| `admin-attributes-editor.spec.ts` | 68 | 22.1 min | shard 1, shard 4, changed |
| `post-wizard-bundle2.spec.ts` | 60 | 21.7 min | shard 2, shard 5 |
| `shell.spec.ts` | 252 | 20.0 min | smoke, shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 15.6 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 14.4 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 42 | 13.2 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 30 | 13.0 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 12.9 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 28 | 12.8 min | shard 1, shard 4, changed |
| `posting-routes.spec.ts` | 50 | 12.7 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 12.3 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 30 | 11.7 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 11.0 min | smoke, shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 32 | 10.0 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 9.3 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 9.0 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 24 | 8.6 min | shard 2, shard 5 |
| `import-security.spec.ts` | 34 | 8.3 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 7.7 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 16 | 6.8 min | shard 1, shard 4, changed |
| `admin-translations-console.spec.ts` | 38 | 5.7 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 5.7 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 12 | 4.4 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 16 | 3.7 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 3.6 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 3.6 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 3.2 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.8 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 14 | 2.0 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.9 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.8 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.2 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 1.0 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.8 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 4 | 0.7 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `post-wizard-recent.spec.ts` | 2 | 0.6 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 86.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 72.9 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 71.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 64.2 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 60.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 59.7 s |
| `category-nav.spec.ts` › C-5: the rail follows root pointer order, and a pointer reorder reaches it | desktop-1280 | 54.5 s |
| `admin-attributes-editor.spec.ts` › AT-58 a rank swap within one category imports through the route | mobile-360 | 53.2 s |
| `admin-attributes-editor.spec.ts` › AT-58 a rank swap within one category imports through the route | desktop-1280 | 51.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-30 an order edit lands as the file's sequence, a created row takes its place, a catch-all stays pinned, and undo restores it | desktop-1280 | 51.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 49.3 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 48.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 46.3 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) | mobile-360 | 44.4 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) | desktop-1280 | 43.6 s |
