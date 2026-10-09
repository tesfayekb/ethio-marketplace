# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37925469119
- Commit: `be21faa4c281ac71c28ce233e3bc9abe32ad3b30`
- Attempt: 1
- Written (UTC): 2026-10-09T12:13:08.433Z
- Passed: 1622 · Skipped: 173 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 3
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › L4b location picker › LS-12 a market whose every level has one option resolves to the deepest place — Error: [e2e:l4b3] seeding region in XV failed: parentMissing
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op — Error: CT-18 the round trip was not a no-op: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · feed-index.spec.ts › FEED INDEX › FE-8 the tier sets the rank — Error: [e2e:setup] POST /token?grant_type=password failed (502): <html>

## Flaky bodies (DEC-078)

### shell.spec.ts › L4b location picker › LS-12 a market whose every level has one option resolves to the deepest place

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: [e2e:l4b3] seeding region in XV failed: parentMissing
--- further error 1 ---
Error: [e2e:l4b3] seeding region in XV failed: parentMissing

   at helpers/locations.ts:662

  660 |       .single();
  661 |     if (error || !data) {
> 662 |       throw new Error(`[e2e:l4b3] seeding ${level} in ${code} failed: ${error?.message ?? "none"}`);
      |             ^
  663 |     }
  664 |     return data;
  665 |   };
    at place (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:662:13)
    at seedSingleOptionMarket (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:676:18)
    at seedMarket (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2145:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2755:20
```

Context: context file not found for `shell-L4b-location-picker-LS-12-a-market-whose-every-level-has-one-option-resolves-to-the-deepest-place-desktop-1280`

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: CT-18 the round trip was not a no-op: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
    "adds": 0,
-   "changes": 0,
+   "changes": 15,
    "deletes": 0,
    "reactivations": 0,
    "refused": 0,
    "retires": 0,
  }
--- further error 1 ---
Error: CT-18 the round trip was not a no-op: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
    "adds": 0,
-   "changes": 0,
+   "changes": 15,
    "deletes": 0,
    "reactivations": 0,
    "refused": 0,
    "retires": 0,
  }

  855 |       { adds, changes, retires, reactivations, deletes, refused },
  856 |       `CT-18 the round trip was not a no-op: ${await counts.textContent()}`,
> 857 |     ).toEqual({ adds: 0, changes: 0, retires: 0, reactivations: 0, deletes: 0, refused: 0 });
```

Context:

```text
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Import categories" [active] [ref=e2]:
    - heading "Import categories" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Import categories
      - paragraph [ref=e6]: Choose the categories file you exported. Nothing is written until you preview it and confirm.
      - paragraph [ref=e7]: "Columns marked “(read-only)” are worked out for you: you can edit them in the file, but they are never applied."
      - status [ref=e8]: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused
      - generic [ref=e9]:
        - button "Discard" [ref=e10] [cursor=pointer]
        - button "Confirm import" [ref=e11] [cursor=pointer]
    - button "Close" [ref=e12] [cursor=pointer]:
      - img [ref=e13]
      - generic [ref=e16]: Close
```
```

### feed-index.spec.ts › FEED INDEX › FE-8 the tier sets the rank

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (502): <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>

--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (502): <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>


   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:367:23)
```

Context: context file not found for `feed-index-FEED-INDEX-FE-8-the-tier-sets-the-rank-mobile-360`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

108 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 8 | shard 3, shard 5, shard 6, changed |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-e<n>aef: e<n>e_par_ecnlmy → e<n>e_chi_<n>wskki` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-p<n>ryzw: e<n>e_par_gtppq<n> → e<n>e_chi_f<n>d<n>mk` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-e<n>aef: e<n>e_par_ecnlmy → e<n>e_chi_<n>wskki ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-p<n>ryzw: e<n>e_par_gtppq<n> → e<n>e_chi_f<n>d<n>mk ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 3, shard 5, shard 6, changed

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
| smoke | 2026-10-09T11:44:30.811Z | 16.3 min |
| email | 2026-10-09T11:44:32.508Z | 0.2 min |
| shard 1 | 2026-10-09T11:44:34.681Z | 28.2 min |
| shard 2 | 2026-10-09T11:44:33.086Z | 25.7 min |
| shard 3 | 2026-10-09T11:44:26.497Z | 21.7 min |
| shard 4 | 2026-10-09T11:44:32.168Z | 27.4 min |
| shard 5 | 2026-10-09T11:44:26.445Z | 21.5 min |
| shard 6 | 2026-10-09T11:44:29.819Z | 23.3 min |
| changed | 2026-10-09T11:44:27.190Z | 20.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-bundle2.spec.ts` | 128 | 39.0 min | shard 2, shard 5, changed |
| `shell.spec.ts` | 504 | 29.8 min | smoke, shard 3, shard 6, changed |
| `post-wizard-specs.spec.ts` | 78 | 24.8 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 48 | 13.6 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 13.2 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 11.0 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 50 | 10.5 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 10.4 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 30 | 10.2 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 42 | 10.1 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 10.1 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 9.0 min | smoke, shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 32 | 8.6 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 8.6 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.5 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 28 | 8.3 min | shard 2, shard 5, changed |
| `admin-attributes-import.spec.ts` | 40 | 7.6 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 7.4 min | shard 3, shard 6 |
| `feed-index.spec.ts` | 28 | 7.2 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 6.7 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 5.7 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.5 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.5 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 14 | 5.1 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 5.0 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 4.8 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.4 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 16 | 3.8 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 3.3 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 10 | 3.0 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 8 | 2.9 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.4 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.2 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 10 | 2.1 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.0 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.9 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.8 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.5 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 4, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 1 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-bundle2.spec.ts` › PW-179 a pin save never restates directions the step could not read | mobile-360 | 74.2 s |
| `post-wizard-bundle2.spec.ts` › PW-179 a pin save never restates directions the step could not read | desktop-1280 | 68.5 s |
| `post-wizard-bundle2.spec.ts` › PW-179 a pin save never restates directions the step could not read | mobile-360 | 66.7 s |
| `post-wizard-bundle2.spec.ts` › PW-179 a pin save never restates directions the step could not read | desktop-1280 | 65.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 58.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 57.4 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 54.8 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 50.3 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 46.0 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 45.3 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 43.9 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 43.2 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 41.9 s |
| `posting-routes-catalog.spec.ts` › PR-41 the door refuses an answer the chosen options do not allow | desktop-1280 | 41.2 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 40.8 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37925469119-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37925469119-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 17 (pool 5, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 37925469119-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 36 user(s) owned by process 37925469119-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37925469119-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 5, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 37925469119-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 37925469119-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37925469119-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37925469119-changed
```

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-179 a pin save never restates directions the step could not read

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PW-179: the failed read was not shown

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-details-failed')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-179: the failed read was not shown with timeout 20000ms
  - waiting for getByTestId('post-where-details-failed')

--- further error 1 ---
Error: PW-179: the failed read was not shown

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-details-failed')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-179: the failed read was not shown with timeout 20000ms
  - waiting for getByTestId('post-where-details-failed')


  335 |       page.getByTestId("post-where-details-failed"),
  336 |       "PW-179: the failed read was not shown",
> 337 |     ).toBeVisible({ timeout: 20_000 });
      |       ^
  338 |
  339 |     await savePinOnMap(page, 120, 90);
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-179-a-pin-save-never-restates-directions-the-step-could-not-read-mobile-360`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-179 a pin save never restates directions the step could not read

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: PW-179: the failed read was not shown

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-details-failed')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-179: the failed read was not shown with timeout 20000ms
  - waiting for getByTestId('post-where-details-failed')

--- further error 1 ---
Error: PW-179: the failed read was not shown

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-details-failed')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-179: the failed read was not shown with timeout 20000ms
  - waiting for getByTestId('post-where-details-failed')


  335 |       page.getByTestId("post-where-details-failed"),
  336 |       "PW-179: the failed read was not shown",
> 337 |     ).toBeVisible({ timeout: 20_000 });
      |       ^
  338 |
  339 |     await savePinOnMap(page, 120, 90);
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-179-a-pin-save-never-restates-directions-the-step-could-not-read-desktop-1280`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-179 a pin save never restates directions the step could not read

- Source: `changed`
- Project: `mobile-360`

```text
Error: PW-179: the failed read was not shown

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-details-failed')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-179: the failed read was not shown with timeout 20000ms
  - waiting for getByTestId('post-where-details-failed')

--- further error 1 ---
Error: PW-179: the failed read was not shown

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-details-failed')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-179: the failed read was not shown with timeout 20000ms
  - waiting for getByTestId('post-where-details-failed')


  335 |       page.getByTestId("post-where-details-failed"),
  336 |       "PW-179: the failed read was not shown",
> 337 |     ).toBeVisible({ timeout: 20_000 });
      |       ^
  338 |
  339 |     await savePinOnMap(page, 120, 90);
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-179-a-pin-save-never-restates-directions-the-step-could-not-read-mobile-360`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-179 a pin save never restates directions the step could not read

- Source: `changed`
- Project: `desktop-1280`

```text
Error: PW-179: the failed read was not shown

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-details-failed')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-179: the failed read was not shown with timeout 20000ms
  - waiting for getByTestId('post-where-details-failed')

--- further error 1 ---
Error: PW-179: the failed read was not shown

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-details-failed')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-179: the failed read was not shown with timeout 20000ms
  - waiting for getByTestId('post-where-details-failed')


  335 |       page.getByTestId("post-where-details-failed"),
  336 |       "PW-179: the failed read was not shown",
> 337 |     ).toBeVisible({ timeout: 20_000 });
      |       ^
  338 |
  339 |     await savePinOnMap(page, 120, 90);
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-179-a-pin-save-never-restates-directions-the-step-could-not-read-desktop-1280`

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 2

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×2
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 5

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×2
```

## Server errors: changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: changed

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×4
```
