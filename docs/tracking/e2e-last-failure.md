# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38646586143
- Commit: `bc9a0c6d7b9ba82b5fea8e08f855b5f9104eb18a`
- Attempt: 1
- Written (UTC): 2026-10-14T22:53:49.310Z
- Passed: 1698 · Skipped: 126 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · shell.spec.ts › L4b location picker › LS-10 a saved area beats the deepest guess — Error: [e2e:reap] descendants of e2e-loc-6-1-gs-region-9g5bv2 failed: <html>

## Flaky bodies (DEC-078)

### shell.spec.ts › L4b location picker › LS-10 a saved area beats the deepest guess

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:reap] descendants of e2e-loc-6-1-gs-region-9g5bv2 failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>

--- further error 1 ---
Error: [e2e:reap] descendants of e2e-loc-6-1-gs-region-9g5bv2 failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>


   at helpers/locations.ts:259

  257 |         .select("id")
  258 |         .in("parent_id", parentBatch);
> 259 |       if (error) throw new Error(`[e2e:reap] descendants of ${slug} failed: ${error.message}`);
      |                        ^
  260 |       next.push(...(data ?? []).map((child) => child.id));
  261 |     }
  262 |     frontier = next;
    at destroyLocation (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:259:24)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2565:7
```

Context:

```text
          - listitem [ref=e351]:
            - generic [ref=e352]: About
          - listitem [ref=e353]:
            - generic [ref=e354]: How it works
      - navigation "Help" [ref=e355]:
        - heading "Help" [level=2] [ref=e356]
        - list [ref=e357]:
          - listitem [ref=e358]:
            - generic [ref=e359]: Safety
          - listitem [ref=e360]:
            - generic [ref=e361]: Contact
      - navigation "Legal" [ref=e362]:
        - heading "Legal" [level=2] [ref=e363]
        - list [ref=e364]:
          - listitem [ref=e365]:
            - generic [ref=e366]: Terms
          - listitem [ref=e367]:
            - generic [ref=e368]: Privacy
    - paragraph [ref=e370]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

106 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-p<n>i<n>s: e<n>e_par_ukpbko → e<n>e_chi_pv<n>d<n>y` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-v<n>fdst: e<n>e_par_yjxx<n>y → e<n>e_chi_<n>tv<n>dc` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-p<n>i<n>s: e<n>e_par_ukpbko → e<n>e_chi_pv<n>d<n>y ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-v<n>fdst: e<n>e_par_yjxx<n>y → e<n>e_chi_<n>tv<n>dc ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): no Settings item leaks into the mobile category menu ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-108 an Other basis names the seller's written unit (INC-371) ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-21 a child detail shows only the chosen parent's options and clears on change ×1 · PW-49 a prefill-only fact keeps its input while a settled one does not ×1

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
| smoke | 2026-10-14T22:18:39.342Z | 13.8 min |
| email | 2026-10-14T22:18:41.543Z | 0.2 min |
| shard 1 | 2026-10-14T22:18:46.728Z | 34.0 min |
| shard 2 | 2026-10-14T22:18:49.754Z | 34.6 min |
| shard 3 | 2026-10-14T22:18:37.148Z | 23.8 min |
| shard 4 | 2026-10-14T22:18:44.241Z | 33.6 min |
| shard 5 | 2026-10-14T22:18:39.254Z | 28.3 min |
| shard 6 | 2026-10-14T22:18:41.158Z | 26.2 min |
| changed | 2026-10-14T22:18:43.504Z | 3.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 62 | 20.3 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 80 | 19.7 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 18.4 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 17.2 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 58 | 16.6 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 14.6 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 50 | 14.2 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 11.2 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 10.9 min | shard 3, shard 6 |
| `my-listings-page.spec.ts` | 16 | 10.3 min | shard 2, shard 5, changed |
| `post-wizard-where.spec.ts` | 32 | 10.1 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 44 | 10.0 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.4 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 52 | 9.4 min | shard 3, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 9.0 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 8.9 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 8.6 min | smoke, shard 2, shard 5 |
| `feed-screens.spec.ts` | 28 | 8.5 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.3 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 8.3 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 8.2 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.8 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.6 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 20 | 7.4 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.5 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 6.2 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 16 | 6.1 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.0 min | shard 3, shard 6 |
| `feed-index.spec.ts` | 28 | 5.7 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.5 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 5.0 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 14 | 4.3 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.2 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 3.4 min | shard 2, shard 5 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.0 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.1 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 1.7 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.5 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.3 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.2 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.0 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 58.9 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 58.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 56.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 54.1 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 47.8 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 47.4 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 47.2 s |
| `my-listings-page.spec.ts` › MLP-3 My Listings opens its own page; signed out, the page asks to sign in | mobile-360 | 47.0 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 46.0 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 45.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 45.4 s |
| `my-listings-page.spec.ts` › MLP-3 My Listings opens its own page; signed out, the page asks to sign in | desktop-1280 | 44.9 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 44.8 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 44.3 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 42.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38646586143-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38646586143-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38646586143-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 38646586143-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38646586143-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38646586143-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 38646586143-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38646586143-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38646586143-changed
```

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:session] injected identity mismatch — expected user 83c7b696-4e88-433e-a761-4be94808c8d5, page holds no session.
--- further error 1 ---
Error: [e2e:session] injected identity mismatch — expected user 83c7b696-4e88-433e-a761-4be94808c8d5, page holds no session.

   at helpers/session.ts:210

  208 |   }, storageKey());
  209 |   if (actual !== expected) {
> 210 |     throw new Error(
      |           ^
  211 |       `[e2e:session] injected identity mismatch — expected user ${expected}, page holds ${actual ?? "no session"}.`,
  212 |     );
  213 |   }
    at assertInjectedIdentity (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:210:11)
    at signInViaSession (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:468:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:460:5
```

Context:

```text
          - listitem [ref=e347]:
            - generic [ref=e348]: About
          - listitem [ref=e349]:
            - generic [ref=e350]: How it works
      - navigation "Help" [ref=e351]:
        - heading "Help" [level=2] [ref=e352]
        - list [ref=e353]:
          - listitem [ref=e354]:
            - generic [ref=e355]: Safety
          - listitem [ref=e356]:
            - generic [ref=e357]: Contact
      - navigation "Legal" [ref=e358]:
        - heading "Legal" [level=2] [ref=e359]
        - list [ref=e360]:
          - listitem [ref=e361]:
            - generic [ref=e362]: Terms
          - listitem [ref=e363]:
            - generic [ref=e364]: Privacy
    - paragraph [ref=e366]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:session] injected identity mismatch — expected user e4462914-1db9-4f26-ba2a-7fd77ac42ab9, page holds no session.
--- further error 1 ---
Error: [e2e:session] injected identity mismatch — expected user e4462914-1db9-4f26-ba2a-7fd77ac42ab9, page holds no session.

   at helpers/session.ts:210

  208 |   }, storageKey());
  209 |   if (actual !== expected) {
> 210 |     throw new Error(
      |           ^
  211 |       `[e2e:session] injected identity mismatch — expected user ${expected}, page holds ${actual ?? "no session"}.`,
  212 |     );
  213 |   }
    at assertInjectedIdentity (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:210:11)
    at signInViaSession (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:468:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:460:5
```

Context:

```text
          - listitem [ref=e374]:
            - generic [ref=e375]: About
          - listitem [ref=e376]:
            - generic [ref=e377]: How it works
      - navigation "Help" [ref=e378]:
        - heading "Help" [level=2] [ref=e379]
        - list [ref=e380]:
          - listitem [ref=e381]:
            - generic [ref=e382]: Safety
          - listitem [ref=e383]:
            - generic [ref=e384]: Contact
      - navigation "Legal" [ref=e385]:
        - heading "Legal" [level=2] [ref=e386]
        - list [ref=e387]:
          - listitem [ref=e388]:
            - generic [ref=e389]: Terms
          - listitem [ref=e390]:
            - generic [ref=e391]: Privacy
    - paragraph [ref=e393]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:session] injected identity mismatch — expected user 59b42371-527a-4e4c-b52b-ea6a0ce7142b, page holds no session.
--- further error 1 ---
Error: [e2e:session] injected identity mismatch — expected user 59b42371-527a-4e4c-b52b-ea6a0ce7142b, page holds no session.

   at helpers/session.ts:210

  208 |   }, storageKey());
  209 |   if (actual !== expected) {
> 210 |     throw new Error(
      |           ^
  211 |       `[e2e:session] injected identity mismatch — expected user ${expected}, page holds ${actual ?? "no session"}.`,
  212 |     );
  213 |   }
    at assertInjectedIdentity (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:210:11)
    at signInViaSession (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:468:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:460:5
```

Context:

```text
          - listitem [ref=e347]:
            - generic [ref=e348]: About
          - listitem [ref=e349]:
            - generic [ref=e350]: How it works
      - navigation "Help" [ref=e351]:
        - heading "Help" [level=2] [ref=e352]
        - list [ref=e353]:
          - listitem [ref=e354]:
            - generic [ref=e355]: Safety
          - listitem [ref=e356]:
            - generic [ref=e357]: Contact
      - navigation "Legal" [ref=e358]:
        - heading "Legal" [level=2] [ref=e359]
        - list [ref=e360]:
          - listitem [ref=e361]:
            - generic [ref=e362]: Terms
          - listitem [ref=e363]:
            - generic [ref=e364]: Privacy
    - paragraph [ref=e366]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:session] injected identity mismatch — expected user e784cd8a-3dcb-464c-bdd2-4f73664c56a8, page holds no session.
--- further error 1 ---
Error: [e2e:session] injected identity mismatch — expected user e784cd8a-3dcb-464c-bdd2-4f73664c56a8, page holds no session.

   at helpers/session.ts:210

  208 |   }, storageKey());
  209 |   if (actual !== expected) {
> 210 |     throw new Error(
      |           ^
  211 |       `[e2e:session] injected identity mismatch — expected user ${expected}, page holds ${actual ?? "no session"}.`,
  212 |     );
  213 |   }
    at assertInjectedIdentity (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:210:11)
    at signInViaSession (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:468:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:460:5
```

Context:

```text
          - listitem [ref=e374]:
            - generic [ref=e375]: About
          - listitem [ref=e376]:
            - generic [ref=e377]: How it works
      - navigation "Help" [ref=e378]:
        - heading "Help" [level=2] [ref=e379]
        - list [ref=e380]:
          - listitem [ref=e381]:
            - generic [ref=e382]: Safety
          - listitem [ref=e383]:
            - generic [ref=e384]: Contact
      - navigation "Legal" [ref=e385]:
        - heading "Legal" [level=2] [ref=e386]
        - list [ref=e387]:
          - listitem [ref=e388]:
            - generic [ref=e389]: Terms
          - listitem [ref=e390]:
            - generic [ref=e391]: Privacy
    - paragraph [ref=e393]: © 2026 ethio.com — All rights reserved.
```
```

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

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 5

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

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
