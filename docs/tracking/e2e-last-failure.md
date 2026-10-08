# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37794083090
- Commit: `17f4e9ac5e84a89e022d66a485d6b7ce4fe119e5`
- Attempt: 1
- Written (UTC): 2026-10-08T15:05:48.448Z
- Passed: 1458 · Skipped: 173 · Failed: 18
- Gating failures: 18 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 3
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-place.spec.ts › POSTING WIZARD › PW-41 the geocode route spends a dial and refuses the call past its ceiling — Error: PW-41: the dial never closed within 62 calls
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › U4h device language star › TR-28 hreflang alternates equal the anon publication gate — TimeoutError: page.waitForFunction: Timeout 15000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node — Error: [e2e:l2b] destroying QX failed at place city 903f71d3-c6ca-4d7a-8074-d761a26e3518: update or delete on table "locations" violates foreign key constraint "listing_locations_location_id_fkey" on table "listing_locations"

## Flaky bodies (DEC-078)

### post-wizard-place.spec.ts › POSTING WIZARD › PW-41 the geocode route spends a dial and refuses the call past its ceiling

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PW-41: the dial never closed within 62 calls

expect(received).toBeGreaterThan(expected)

Expected: > 59
Received:   0
--- further error 1 ---
Error: PW-41: the dial never closed within 62 calls

expect(received).toBeGreaterThan(expected)

Expected: > 59
Received:   0

  1457 |     }
  1458 |
> 1459 |     expect(refusedAt, `PW-41: the dial never closed within ${ceiling + 2} calls`).toBeGreaterThan(
       |                                                                                   ^
  1460 |       ceiling - 1,
  1461 |     );
  1462 |     expect(refusal?.field, "PW-41: the refusal named another field").toBe("geocode");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1459:83
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-41-the-geocode-route-spends-a-dial-and-refuses-the-call-past-its-ceiling-mobile-360`

### shell.spec.ts › U4h device language star › TR-28 hreflang alternates equal the anon publication gate

- Source: `shard 3`
- Project: `mobile-360`

```text
TimeoutError: page.waitForFunction: Timeout 15000ms exceeded.
--- further error 1 ---
TimeoutError: page.waitForFunction: Timeout 15000ms exceeded.

  2026 |      * exactly so a reader can wait for truth (J7: poll on truth, no sleep).
  2027 |      */
> 2028 |     await page.waitForFunction(
       |                ^
  2029 |       () => {
  2030 |         const value = (window as unknown as Record<string, unknown>)["__ethioPublicLanguages"] as
  2031 |           | { gateReady?: boolean; codes?: string[] }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2028:16
```

Context:

```text
          - listitem [ref=e198]:
            - generic [ref=e199]: About
          - listitem [ref=e200]:
            - generic [ref=e201]: How it works
      - navigation "Help" [ref=e202]:
        - heading "Help" [level=2] [ref=e203]
        - list [ref=e204]:
          - listitem [ref=e205]:
            - generic [ref=e206]: Safety
          - listitem [ref=e207]:
            - generic [ref=e208]: Contact
      - navigation "Legal" [ref=e209]:
        - heading "Legal" [level=2] [ref=e210]
        - list [ref=e211]:
          - listitem [ref=e212]:
            - generic [ref=e213]: Terms
          - listitem [ref=e214]:
            - generic [ref=e215]: Privacy
    - paragraph [ref=e217]: © 2026 ethio.com — All rights reserved.
```
```

### shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:l2b] destroying QX failed at place city 903f71d3-c6ca-4d7a-8074-d761a26e3518: update or delete on table "locations" violates foreign key constraint "listing_locations_location_id_fkey" on table "listing_locations"
--- further error 1 ---
Error: [e2e:l2b] destroying QX failed at place city 903f71d3-c6ca-4d7a-8074-d761a26e3518: update or delete on table "locations" violates foreign key constraint "listing_locations_location_id_fkey" on table "listing_locations"

   at helpers/countries.ts:227

  225 |   const supabase = adminClient();
  226 |   const fail = (step: string, message: string) => {
> 227 |     throw new Error(`[e2e:l2b] destroying ${code} failed at ${step}: ${message}`);
      |           ^
  228 |   };
  229 |
  230 |   // CLOSE FIRST: a market that is still open outlives a partial failure as a
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/countries.ts:227:11)
    at destroyCountry (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/countries.ts:252:24)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2678:7
--- further error 2 ---
Error: [e2e:l2b] destroying QX failed at place city 903f71d3-c6ca-4d7a-8074-d761a26e3518: update or delete on table "locations" violates foreign key constraint "listing_locations_location_id_fkey" on table "listing_locations"

   at helpers/countries.ts:227

  225 |   const supabase = adminClient();
  226 |   const fail = (step: string, message: string) => {
> 227 |     throw new Error(`[e2e:l2b] destroying ${code} failed at ${step}: ${message}`);
      |           ^
  228 |   };
  229 |
  230 |   // CLOSE FIRST: a market that is still open outlives a partial failure as a
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/countries.ts:227:11)
    at destroyCountry (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/countries.ts:252:24)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2124:31
```

Context: context file not found for `shell-L4b-location-picker-LS-11-picking-a-second-market-renders-its-own-tree-and-saves-its-own-node-desktop-1280`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

109 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 9 | shard 2, shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-kllleg: e<n>e_par_<n>n<n> → e<n>e_chi_s<n>mbm` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-lgd<n>a<n>: e<n>e_par_<n>lvxg → e<n>e_chi_jhdrnm` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-kllleg: e<n>e_par_<n>n<n> → e<n>e_chi_s<n>mbm ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-lgd<n>a<n>: e<n>e_par_<n>lvxg → e<n>e_chi_jhdrnm ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 2, shard 3, shard 6

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
| smoke | 2026-10-08T14:39:38.744Z | 16.9 min |
| email | 2026-10-08T14:39:40.379Z | 0.2 min |
| shard 1 | 2026-10-08T14:39:43.095Z | 23.8 min |
| shard 2 | 2026-10-08T14:39:46.106Z | 21.5 min |
| shard 3 | 2026-10-08T14:39:49.998Z | 23.2 min |
| shard 4 | 2026-10-08T14:39:34.150Z | 21.4 min |
| shard 5 | 2026-10-08T14:39:44.870Z | 25.7 min |
| shard 6 | 2026-10-08T14:39:42.984Z | 17.0 min |
| changed | 2026-10-08T14:39:52.478Z | 7.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 504 | 33.6 min | smoke, shard 3, shard 6, changed |
| `post-wizard-specs.spec.ts` | 78 | 23.2 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 17.1 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 42 | 11.4 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 11.1 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 48 | 11.0 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 11.0 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 30 | 10.8 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 9.8 min | shard 3, shard 5 |
| `posting-routes.spec.ts` | 50 | 9.5 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 9.0 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 8.6 min | smoke, shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 32 | 7.3 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 7.1 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 6.8 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 6.6 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.4 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 6.3 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 6.1 min | shard 1, shard 5 |
| `admin-locations.spec.ts` | 36 | 5.9 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 5.9 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.4 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.6 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 14 | 4.1 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 3.4 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 2.9 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 10 | 2.4 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 8 | 2.3 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.2 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.0 min | shard 3, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.0 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 4 | 1.9 min | shard 3, shard 5, changed |
| `smoke-auth-i18n.spec.ts` | 4 | 1.9 min | smoke, shard 4, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.8 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.5 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.3 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 2 | 0.6 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.4 min | shard 2 |
| `house-style.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 58.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 58.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 56.5 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 54.0 s |
| `shell.spec.ts` › TR-27 a star set signed-out survives reload, sign-in and sign-out | mobile-360 | 53.5 s |
| `shell.spec.ts` › TR-27 a star set signed-out survives reload, sign-in and sign-out | mobile-360 | 51.3 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 50.6 s |
| `shell.spec.ts` › TR-28 the account carries onto a starless device, and never over a star | mobile-360 | 50.2 s |
| `smoke-auth-i18n.spec.ts` › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity | mobile-360 | 49.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 48.9 s |
| `smoke-auth-i18n.spec.ts` › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity | mobile-360 | 47.5 s |
| `post-wizard-place.spec.ts` › PW-41 the geocode route spends a dial and refuses the call past its ceiling | mobile-360 | 46.5 s |
| `shell.spec.ts` › TR-27 a star set signed-out survives reload, sign-in and sign-out | mobile-360 | 44.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 44.6 s |
| `shell.spec.ts` › TR-28 the account carries onto a starless device, and never over a star | mobile-360 | 44.3 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37794083090-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37794083090-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 5, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 37794083090-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 37794083090-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37794083090-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 5, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37794083090-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 37794083090-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37794083090-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 3, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37794083090-changed
```

## shell.spec.ts › app shell › the location row cascades Country -> Region -> City, city selectable

- Source: `smoke`
- Project: `mobile-360`

```text
Error: an area label is echoed outside the pickers

expect(received).toBe(expected) // Object.is equality

Expected: "Area"
Received: "Showing listings inListings in"
--- further error 1 ---
Error: an area label is echoed outside the pickers

expect(received).toBe(expected) // Object.is equality

Expected: "Area"
Received: "Showing listings inListings in"

  317 |     });
  318 |     // Only the screen-reader-only row label may live outside the pickers.
> 319 |     expect(outside, "an area label is echoed outside the pickers").toBe(en["location.label"]);
      |                                                                    ^
  320 |   });
  321 |
  322 |   test("breadcrumb segments navigate the category path", async ({ page }) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:319:68
```

Context: context file not found for `shell-app-shell-the-location-row-cascades-Country-Region-City-city-selectable-mobile-360`

## shell.spec.ts › app shell › the location row cascades Country -> Region -> City, city selectable

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: an area label is echoed outside the pickers

expect(received).toBe(expected) // Object.is equality

Expected: "Area"
Received: "Showing listings inListings in"
--- further error 1 ---
Error: an area label is echoed outside the pickers

expect(received).toBe(expected) // Object.is equality

Expected: "Area"
Received: "Showing listings inListings in"

  317 |     });
  318 |     // Only the screen-reader-only row label may live outside the pickers.
> 319 |     expect(outside, "an area label is echoed outside the pickers").toBe(en["location.label"]);
      |                                                                    ^
  320 |   });
  321 |
  322 |   test("breadcrumb segments navigate the category path", async ({ page }) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:319:68
```

Context: context file not found for `shell-app-shell-the-location-row-cascades-Country-Region-City-city-selectable-desktop-1280`

## shell.spec.ts › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out

- Source: `smoke`
- Project: `mobile-360`

```text
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Account menu' }) to be visible

--- further error 1 ---
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Account menu' }) to be visible


   at helpers/ui.ts:174

  172 |   await waitForHydration(page);
  173 |   const trigger = page.getByRole("button", { name: label });
> 174 |   await trigger.waitFor({ state: "visible", timeout: 15000 });
      |                 ^
  175 |   await trigger.click();
  176 |   return trigger;
  177 | }
    at openAccountMenu (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:174:17)
    at signOutViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:334:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1946:5
```

Context:

```text
          - listitem [ref=e219]:
            - generic [ref=e220]: ስለ እኛ
          - listitem [ref=e221]:
            - generic [ref=e222]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e223]:
        - heading "እገዛ" [level=2] [ref=e224]
        - list [ref=e225]:
          - listitem [ref=e226]:
            - generic [ref=e227]: ደህንነት
          - listitem [ref=e228]:
            - generic [ref=e229]: ያግኙን
      - navigation "ሕጋዊ" [ref=e230]:
        - heading "ሕጋዊ" [level=2] [ref=e231]
        - list [ref=e232]:
          - listitem [ref=e233]:
            - generic [ref=e234]: ውሎች
          - listitem [ref=e235]:
            - generic [ref=e236]: ግላዊነት
    - paragraph [ref=e238]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## shell.spec.ts › U4h device language star › TR-28 the account carries onto a starless device, and never over a star

- Source: `smoke`
- Project: `mobile-360`

```text
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Account menu' }) to be visible

--- further error 1 ---
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Account menu' }) to be visible


   at helpers/ui.ts:174

  172 |   await waitForHydration(page);
  173 |   const trigger = page.getByRole("button", { name: label });
> 174 |   await trigger.waitFor({ state: "visible", timeout: 15000 });
      |                 ^
  175 |   await trigger.click();
  176 |   return trigger;
  177 | }
    at openAccountMenu (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:174:17)
    at signOutViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:334:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1980:7
```

Context:

```text
          - listitem [ref=e213]:
            - generic [ref=e214]: ስለ እኛ
          - listitem [ref=e215]:
            - generic [ref=e216]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e217]:
        - heading "እገዛ" [level=2] [ref=e218]
        - list [ref=e219]:
          - listitem [ref=e220]:
            - generic [ref=e221]: ደህንነት
          - listitem [ref=e222]:
            - generic [ref=e223]: ያግኙን
      - navigation "ሕጋዊ" [ref=e224]:
        - heading "ሕጋዊ" [level=2] [ref=e225]
        - list [ref=e226]:
          - listitem [ref=e227]:
            - generic [ref=e228]: ውሎች
          - listitem [ref=e229]:
            - generic [ref=e230]: ግላዊነት
    - paragraph [ref=e232]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity

- Source: `smoke`
- Project: `mobile-360`

```text
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Account menu' }) to be visible

--- further error 1 ---
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Account menu' }) to be visible


   at helpers/ui.ts:174

  172 |   await waitForHydration(page);
  173 |   const trigger = page.getByRole("button", { name: label });
> 174 |   await trigger.waitFor({ state: "visible", timeout: 15000 });
      |                 ^
  175 |   await trigger.click();
  176 |   return trigger;
  177 | }
    at openAccountMenu (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:174:17)
    at signOutViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:334:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/smoke-auth-i18n.spec.ts:92:3
```

Context:

```text
              - listitem:
                - generic: ውሎች
              - listitem:
                - generic: ግላዊነት
        - generic:
          - paragraph: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
  - menu "የአካውንት ዝርዝር" [active] [ref=e1]:
    - generic [ref=e2]: e2e-pool-ssmokeb-000
    - separator [ref=e3]
    - menuitem "መገለጫ" [ref=e4]:
      - img [ref=e5]
      - text: መገለጫ
    - menuitem "ቅንብሮች" [ref=e8]:
      - img [ref=e9]
      - text: ቅንብሮች
    - separator [ref=e12]
    - menuitem "ይውጡ" [ref=e13]:
      - img [ref=e14]
      - text: ይውጡ
```
```

## post-wizard-recent.spec.ts › POSTING WIZARD — USED BEFORE › PW-171 two chips, most used first; a tap selects that leaf; drafts only draw none

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    12
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    12

  90 |       );
  91 |       if (!labelBox) throw new Error("PW-171: recent label has no box");
> 92 |       for (const box of chipBoxes) expect(Math.abs(box.top - labelBox.y)).toBeLessThanOrEqual(2);
     |                                                                           ^
  93 |       expect(chipBoxes.map((box) => box.title)).toEqual([xName, yName]);
  94 |       const row = page.getByTestId("post-category-recent-row");
  95 |       expect(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-recent.spec.ts:92:75
```

Context:

```text
          - listitem [ref=e352]:
            - generic [ref=e353]: About
          - listitem [ref=e354]:
            - generic [ref=e355]: How it works
      - navigation "Help" [ref=e356]:
        - heading "Help" [level=2] [ref=e357]
        - list [ref=e358]:
          - listitem [ref=e359]:
            - generic [ref=e360]: Safety
          - listitem [ref=e361]:
            - generic [ref=e362]: Contact
      - navigation "Legal" [ref=e363]:
        - heading "Legal" [level=2] [ref=e364]
        - list [ref=e365]:
          - listitem [ref=e366]:
            - generic [ref=e367]: Terms
          - listitem [ref=e368]:
            - generic [ref=e369]: Privacy
    - paragraph [ref=e371]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › app shell › the location row cascades Country -> Region -> City, city selectable

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: an area label is echoed outside the pickers

expect(received).toBe(expected) // Object.is equality

Expected: "Area"
Received: "Showing listings inListings in"
--- further error 1 ---
Error: an area label is echoed outside the pickers

expect(received).toBe(expected) // Object.is equality

Expected: "Area"
Received: "Showing listings inListings in"

  317 |     });
  318 |     // Only the screen-reader-only row label may live outside the pickers.
> 319 |     expect(outside, "an area label is echoed outside the pickers").toBe(en["location.label"]);
      |                                                                    ^
  320 |   });
  321 |
  322 |   test("breadcrumb segments navigate the category path", async ({ page }) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:319:68
```

Context: context file not found for `shell-app-shell-the-location-row-cascades-Country-Region-City-city-selectable-mobile-360`

## shell.spec.ts › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out

- Source: `shard 3`
- Project: `mobile-360`

```text
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Account menu' }) to be visible

--- further error 1 ---
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Account menu' }) to be visible


   at helpers/ui.ts:174

  172 |   await waitForHydration(page);
  173 |   const trigger = page.getByRole("button", { name: label });
> 174 |   await trigger.waitFor({ state: "visible", timeout: 15000 });
      |                 ^
  175 |   await trigger.click();
  176 |   return trigger;
  177 | }
    at openAccountMenu (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:174:17)
    at signOutViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:334:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1946:5
```

Context:

```text
          - listitem [ref=e219]:
            - generic [ref=e220]: ስለ እኛ
          - listitem [ref=e221]:
            - generic [ref=e222]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e223]:
        - heading "እገዛ" [level=2] [ref=e224]
        - list [ref=e225]:
          - listitem [ref=e226]:
            - generic [ref=e227]: ደህንነት
          - listitem [ref=e228]:
            - generic [ref=e229]: ያግኙን
      - navigation "ሕጋዊ" [ref=e230]:
        - heading "ሕጋዊ" [level=2] [ref=e231]
        - list [ref=e232]:
          - listitem [ref=e233]:
            - generic [ref=e234]: ውሎች
          - listitem [ref=e235]:
            - generic [ref=e236]: ግላዊነት
    - paragraph [ref=e238]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## shell.spec.ts › U4h device language star › TR-28 the account carries onto a starless device, and never over a star

- Source: `shard 3`
- Project: `mobile-360`

```text
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Account menu' }) to be visible

--- further error 1 ---
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Account menu' }) to be visible


   at helpers/ui.ts:174

  172 |   await waitForHydration(page);
  173 |   const trigger = page.getByRole("button", { name: label });
> 174 |   await trigger.waitFor({ state: "visible", timeout: 15000 });
      |                 ^
  175 |   await trigger.click();
  176 |   return trigger;
  177 | }
    at openAccountMenu (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:174:17)
    at signOutViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:334:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1980:7
```

Context:

```text
          - listitem [ref=e213]:
            - generic [ref=e214]: ስለ እኛ
          - listitem [ref=e215]:
            - generic [ref=e216]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e217]:
        - heading "እገዛ" [level=2] [ref=e218]
        - list [ref=e219]:
          - listitem [ref=e220]:
            - generic [ref=e221]: ደህንነት
          - listitem [ref=e222]:
            - generic [ref=e223]: ያግኙን
      - navigation "ሕጋዊ" [ref=e224]:
        - heading "ሕጋዊ" [level=2] [ref=e225]
        - list [ref=e226]:
          - listitem [ref=e227]:
            - generic [ref=e228]: ውሎች
          - listitem [ref=e229]:
            - generic [ref=e230]: ግላዊነት
    - paragraph [ref=e232]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity

- Source: `shard 4`
- Project: `mobile-360`

```text
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Account menu' }) to be visible

--- further error 1 ---
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Account menu' }) to be visible


   at helpers/ui.ts:174

  172 |   await waitForHydration(page);
  173 |   const trigger = page.getByRole("button", { name: label });
> 174 |   await trigger.waitFor({ state: "visible", timeout: 15000 });
      |                 ^
  175 |   await trigger.click();
  176 |   return trigger;
  177 | }
    at openAccountMenu (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:174:17)
    at signOutViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:334:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/smoke-auth-i18n.spec.ts:92:3
```

Context:

```text
              - listitem:
                - generic: ውሎች
              - listitem:
                - generic: ግላዊነት
        - generic:
          - paragraph: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
  - menu "የአካውንት ዝርዝር" [active] [ref=e1]:
    - generic [ref=e2]: e2e-pool-ssmokeb-000
    - separator [ref=e3]
    - menuitem "መገለጫ" [ref=e4]:
      - img [ref=e5]
      - text: መገለጫ
    - menuitem "ቅንብሮች" [ref=e8]:
      - img [ref=e9]
      - text: ቅንብሮች
    - separator [ref=e12]
    - menuitem "ይውጡ" [ref=e13]:
      - img [ref=e14]
      - text: ይውጡ
```
```

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-173 a draft placed in another market opens there, on resume and after Back

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-173 (resume): the step does not show B's city

expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "903f71d3-c6ca-4d7a-8074-d761a26e3518"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-173 (resume): the step does not show B's city with timeout 20000ms
  - waiting for getByTestId('post-where-city')

--- further error 1 ---
Error: PW-173 (resume): the step does not show B's city

expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "903f71d3-c6ca-4d7a-8074-d761a26e3518"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-173 (resume): the step does not show B's city with timeout 20000ms
  - waiting for getByTestId('post-where-city')


  959 |         page.getByTestId("post-where-city"),
  960 |         `PW-173 (${when}): the step does not show B's city`,
> 961 |       ).toHaveValue(b.city.id, { timeout: 20_000 });
      |         ^
  962 |       await expect(page.getByTestId("post-where-market")).toHaveValue(other!);
  963 |       // No draft save is sent before a touch (a wait on the request itself, not a sleep).
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-173-a-draft-placed-in-another-market-opens-there-on-resume-and-after-Back-desktop-1280`

## shell.spec.ts › app shell › the location row cascades Country -> Region -> City, city selectable

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: an area label is echoed outside the pickers

expect(received).toBe(expected) // Object.is equality

Expected: "Area"
Received: "Showing listings inListings in"
--- further error 1 ---
Error: an area label is echoed outside the pickers

expect(received).toBe(expected) // Object.is equality

Expected: "Area"
Received: "Showing listings inListings in"

  317 |     });
  318 |     // Only the screen-reader-only row label may live outside the pickers.
> 319 |     expect(outside, "an area label is echoed outside the pickers").toBe(en["location.label"]);
      |                                                                    ^
  320 |   });
  321 |
  322 |   test("breadcrumb segments navigate the category path", async ({ page }) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:319:68
```

Context: context file not found for `shell-app-shell-the-location-row-cascades-Country-Region-City-city-selectable-desktop-1280`

## post-wizard-recent.spec.ts › POSTING WIZARD — USED BEFORE › PW-171 two chips, most used first; a tap selects that leaf; drafts only draw none

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    12
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    12

  90 |       );
  91 |       if (!labelBox) throw new Error("PW-171: recent label has no box");
> 92 |       for (const box of chipBoxes) expect(Math.abs(box.top - labelBox.y)).toBeLessThanOrEqual(2);
     |                                                                           ^
  93 |       expect(chipBoxes.map((box) => box.title)).toEqual([xName, yName]);
  94 |       const row = page.getByTestId("post-category-recent-row");
  95 |       expect(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-recent.spec.ts:92:75
```

Context:

```text
          - listitem [ref=e352]:
            - generic [ref=e353]: About
          - listitem [ref=e354]:
            - generic [ref=e355]: How it works
      - navigation "Help" [ref=e356]:
        - heading "Help" [level=2] [ref=e357]
        - list [ref=e358]:
          - listitem [ref=e359]:
            - generic [ref=e360]: Safety
          - listitem [ref=e361]:
            - generic [ref=e362]: Contact
      - navigation "Legal" [ref=e363]:
        - heading "Legal" [level=2] [ref=e364]
        - list [ref=e365]:
          - listitem [ref=e366]:
            - generic [ref=e367]: Terms
          - listitem [ref=e368]:
            - generic [ref=e369]: Privacy
    - paragraph [ref=e371]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › app shell › the location row cascades Country -> Region -> City, city selectable

- Source: `changed`
- Project: `mobile-360`

```text
Error: an area label is echoed outside the pickers

expect(received).toBe(expected) // Object.is equality

Expected: "Area"
Received: "Showing listings inListings in"
--- further error 1 ---
Error: an area label is echoed outside the pickers

expect(received).toBe(expected) // Object.is equality

Expected: "Area"
Received: "Showing listings inListings in"

  317 |     });
  318 |     // Only the screen-reader-only row label may live outside the pickers.
> 319 |     expect(outside, "an area label is echoed outside the pickers").toBe(en["location.label"]);
      |                                                                    ^
  320 |   });
  321 |
  322 |   test("breadcrumb segments navigate the category path", async ({ page }) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:319:68
```

Context: context file not found for `shell-app-shell-the-location-row-cascades-Country-Region-City-city-selectable-mobile-360`

## shell.spec.ts › app shell › the location row cascades Country -> Region -> City, city selectable

- Source: `changed`
- Project: `desktop-1280`

```text
Error: an area label is echoed outside the pickers

expect(received).toBe(expected) // Object.is equality

Expected: "Area"
Received: "Showing listings inListings in"
--- further error 1 ---
Error: an area label is echoed outside the pickers

expect(received).toBe(expected) // Object.is equality

Expected: "Area"
Received: "Showing listings inListings in"

  317 |     });
  318 |     // Only the screen-reader-only row label may live outside the pickers.
> 319 |     expect(outside, "an area label is echoed outside the pickers").toBe(en["location.label"]);
      |                                                                    ^
  320 |   });
  321 |
  322 |   test("breadcrumb segments navigate the category path", async ({ page }) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:319:68
```

Context: context file not found for `shell-app-shell-the-location-row-cascades-Country-Region-City-city-selectable-desktop-1280`

## shell.spec.ts › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out

- Source: `changed`
- Project: `mobile-360`

```text
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Account menu' }) to be visible

--- further error 1 ---
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Account menu' }) to be visible


   at helpers/ui.ts:174

  172 |   await waitForHydration(page);
  173 |   const trigger = page.getByRole("button", { name: label });
> 174 |   await trigger.waitFor({ state: "visible", timeout: 15000 });
      |                 ^
  175 |   await trigger.click();
  176 |   return trigger;
  177 | }
    at openAccountMenu (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:174:17)
    at signOutViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:334:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1946:5
```

Context:

```text
          - listitem [ref=e219]:
            - generic [ref=e220]: ስለ እኛ
          - listitem [ref=e221]:
            - generic [ref=e222]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e223]:
        - heading "እገዛ" [level=2] [ref=e224]
        - list [ref=e225]:
          - listitem [ref=e226]:
            - generic [ref=e227]: ደህንነት
          - listitem [ref=e228]:
            - generic [ref=e229]: ያግኙን
      - navigation "ሕጋዊ" [ref=e230]:
        - heading "ሕጋዊ" [level=2] [ref=e231]
        - list [ref=e232]:
          - listitem [ref=e233]:
            - generic [ref=e234]: ውሎች
          - listitem [ref=e235]:
            - generic [ref=e236]: ግላዊነት
    - paragraph [ref=e238]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## shell.spec.ts › U4h device language star › TR-28 the account carries onto a starless device, and never over a star

- Source: `changed`
- Project: `mobile-360`

```text
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Account menu' }) to be visible

--- further error 1 ---
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Account menu' }) to be visible


   at helpers/ui.ts:174

  172 |   await waitForHydration(page);
  173 |   const trigger = page.getByRole("button", { name: label });
> 174 |   await trigger.waitFor({ state: "visible", timeout: 15000 });
      |                 ^
  175 |   await trigger.click();
  176 |   return trigger;
  177 | }
    at openAccountMenu (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:174:17)
    at signOutViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:334:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1980:7
```

Context:

```text
          - listitem [ref=e213]:
            - generic [ref=e214]: ስለ እኛ
          - listitem [ref=e215]:
            - generic [ref=e216]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e217]:
        - heading "እገዛ" [level=2] [ref=e218]
        - list [ref=e219]:
          - listitem [ref=e220]:
            - generic [ref=e221]: ደህንነት
          - listitem [ref=e222]:
            - generic [ref=e223]: ያግኙን
      - navigation "ሕጋዊ" [ref=e224]:
        - heading "ሕጋዊ" [level=2] [ref=e225]
        - list [ref=e226]:
          - listitem [ref=e227]:
            - generic [ref=e228]: ውሎች
          - listitem [ref=e229]:
            - generic [ref=e230]: ግላዊነት
    - paragraph [ref=e232]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## shell.spec.ts › U4h device language star › TR-28 hreflang alternates equal the anon publication gate

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [INC-113] url: http://127.0.0.1:4173/
[INC-113] html lang: en
[INC-113] provider publicLanguages: {"gateReady":true,"degraded":false,"active":"en","star":null,"codes":["en","am"]}
[INC-113] rendered options: (none) · stars: (none) · menu closed (options are portalled)

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 0

  Array [
    "am",
    "en",
    "x-default",
-   "zxb-51de",
  ]
--- further error 1 ---
Error: [INC-113] url: http://127.0.0.1:4173/
[INC-113] html lang: en
[INC-113] provider publicLanguages: {"gateReady":true,"degraded":false,"active":"en","star":null,"codes":["en","am"]}
[INC-113] rendered options: (none) · stars: (none) · menu closed (options are portalled)

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 0

  Array [
    "am",
    "en",
    "x-default",
-   "zxb-51de",
  ]

  2074 |       .locator("link[rel='alternate']")
  2075 |       .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("hreflang") ?? ""));
> 2076 |     expect(normalise(alternates), await describeSwitcher(page)).toEqual(
```

Context:

```text
          - listitem [ref=e208]:
            - generic [ref=e209]: About
          - listitem [ref=e210]:
            - generic [ref=e211]: How it works
      - navigation "Help" [ref=e212]:
        - heading "Help" [level=2] [ref=e213]
        - list [ref=e214]:
          - listitem [ref=e215]:
            - generic [ref=e216]: Safety
          - listitem [ref=e217]:
            - generic [ref=e218]: Contact
      - navigation "Legal" [ref=e219]:
        - heading "Legal" [level=2] [ref=e220]
        - list [ref=e221]:
          - listitem [ref=e222]:
            - generic [ref=e223]: Terms
          - listitem [ref=e224]:
            - generic [ref=e225]: Privacy
    - paragraph [ref=e227]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

```text
[client-error] console.error: [client-error] gate fetch threw
console.error: [client-error] gate fetch threw
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×4
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-3-lgd3a0: e2e_par_72lvxg → e2e_chi_jhdrnm
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

```text
[client-error] console.error: [client-error] gate fetch threw
console.error: [client-error] gate fetch threw
```
