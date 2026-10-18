# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39155523088
- Commit: `57be45b21fb7900f0d063e2d724326613385fab8`
- Attempt: 1
- Written (UTC): 2026-10-18T19:49:56.567Z
- Passed: 1941 · Skipped: 136 · Failed: 9
- Gating failures: 9 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-46 Save and Share sit in the title box — Error: expect(received).toBeLessThanOrEqual(expected)
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-console.spec.ts › U4b translations console › TR-7 sync imports the compiled catalog and reports its counts — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-46 Save and Share sit in the title box

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    24
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    24

  1629 |       expect(
  1630 |         Math.abs(sellerBox.y + sellerBox.height - (mediaBox.y + mediaBox.height)),
> 1631 |       ).toBeLessThanOrEqual(1);
       |         ^
  1632 |     } else if (article.width >= 672)
  1633 |       expect(
  1634 |         Math.abs(headlineBox.y + headlineBox.height - (mediaBox.y + mediaBox.height)),
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1631:9
```

Context:

```text
        - heading "Company" [level=2] [ref=e322]
        - list [ref=e323]:
          - listitem [ref=e324]:
            - generic [ref=e325]: About
          - listitem [ref=e326]:
            - generic [ref=e327]: Contact
      - navigation "Help" [ref=e328]:
        - heading "Help" [level=2] [ref=e329]
        - list [ref=e330]:
          - listitem [ref=e331]:
            - generic [ref=e332]: Safety
      - navigation "Legal" [ref=e333]:
        - heading "Legal" [level=2] [ref=e334]
        - list [ref=e335]:
          - listitem [ref=e336]:
            - generic [ref=e337]: Terms
          - listitem [ref=e338]:
            - generic [ref=e339]: Privacy
    - paragraph [ref=e341]: © 2026 ethio.com — All rights reserved.
```
```

### admin-translations-console.spec.ts › U4b translations console › TR-7 sync imports the compiled catalog and reports its counts

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('translations-sync-done')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('translations-sync-done')

[e2e:l4c] sync route (admin_sync_ui_keys) → 409 {"code":"23503","details":"Key (lang_code)=(zzq-3601tr31) is not present in table \"languages\".","hint":null,"message":"insert or update on table \"ui_translations\" violates foreign key constraint \"ui_translations_lang_code_fkey\""}
pooled user 70672ed2-7a7c-45b3-8b11-70a04a2b2e9e
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('translations-sync-done')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('translations-sync-done')

[e2e:l4c] sync route (admin_sync_ui_keys) → 409 {"code":"23503","details":"Key (lang_code)=(zzq-3601tr31) is not present in table \"languages\".","hint":null,"message":"insert or update on table \"ui_translations\" violates foreign key constraint \"ui_translations_lang_code_fkey\""}
pooled user 70672ed2-7a7c-45b3-8b11-70a04a2b2e9e

  101 |     await assertion();
  102 |   } catch (error) {
> 103 |     throw new Error(
      |           ^
  104 |       `${error instanceof Error ? error.message : String(error)}\n[e2e:l4c] ${await evidence()}`,
  105 |     );
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 409 ()
[client-error] HTTP 409 POST /rest/v1/rpc/admin_sync_ui_keys ({"code":"23503","details":"Key (lang_code)=(zzq-3601tr31) is not present in table \"languages\".","hint":null,"message":"insert or update on table \"ui_translations\" violates foreign key constraint \)
```

Context:

```text
        - heading "Company" [level=2] [ref=e936]
        - list [ref=e937]:
          - listitem [ref=e938]:
            - generic [ref=e939]: About
          - listitem [ref=e940]:
            - generic [ref=e941]: Contact
      - navigation "Help" [ref=e942]:
        - heading "Help" [level=2] [ref=e943]
        - list [ref=e944]:
          - listitem [ref=e945]:
            - generic [ref=e946]: Safety
      - navigation "Legal" [ref=e947]:
        - heading "Legal" [level=2] [ref=e948]
        - list [ref=e949]:
          - listitem [ref=e950]:
            - generic [ref=e951]: Terms
          - listitem [ref=e952]:
            - generic [ref=e953]: Privacy
    - paragraph [ref=e955]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

115 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 15 | shard 3, shard 6 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>dj<n>b: e<n>e_par_<n>iz<n>yc → e<n>e_chi_<n>jd<n>lm` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-t<n>tgy: e<n>e_par_hlh<n> → e<n>e_chi_<n>nczhn` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>dj<n>b: e<n>e_par_<n>iz<n>yc → e<n>e_chi_<n>jd<n>lm ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-t<n>tgy: e<n>e_par_hlh<n> → e<n>e_chi_<n>nczhn ×1

Off the allowlist:

### listing not found

- Count: 15 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-50 the specifications show every row open in display order (D41) ×3 · PW-17 the currency is preselected and searchable by name in one control ×2 · PW-177 a question removed while the form is open never blocks the next edits ×2 · PW-21 a child detail shows only the chosen parent's options and clears on change ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · PW-51 a dependent detail never renders above the answer it hangs on ×2

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-18T18:59:55.790Z | 17.3 min |
| email | 2026-10-18T18:59:57.797Z | 0.2 min |
| shard 1 | 2026-10-18T19:00:04.433Z | 48.9 min |
| shard 2 | 2026-10-18T18:59:51.854Z | 37.0 min |
| shard 3 | 2026-10-18T18:59:52.786Z | 33.5 min |
| shard 4 | 2026-10-18T19:00:01.092Z | 49.6 min |
| shard 5 | 2026-10-18T19:00:00.577Z | 44.7 min |
| shard 6 | 2026-10-18T18:59:55.370Z | 36.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 66 | 30.6 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 25.9 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 25.1 min | shard 2, shard 5 |
| `shell.spec.ts` | 360 | 20.7 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 18.3 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 17.1 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 80 | 16.3 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 15.3 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 52 | 15.2 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 15.2 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 13.9 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 13.7 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 13.1 min | shard 3, shard 6 |
| `ad-page-doors.spec.ts` | 30 | 13.0 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 12.7 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 12.7 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 11.9 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 11.5 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 11.3 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 10.8 min | smoke, shard 2, shard 5 |
| `feed-screens.spec.ts` | 32 | 10.5 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 10.1 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 9.5 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.5 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 8.2 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 8.1 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 8.1 min | shard 1, shard 5 |
| `feed-index.spec.ts` | 30 | 7.7 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.4 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 7.2 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.0 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.8 min | shard 3, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 6.6 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 6.2 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.7 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.6 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.1 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.7 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.4 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.8 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.5 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 2.5 min | shard 1, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.2 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.0 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.9 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 1.8 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.4 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 1.0 min | smoke, shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 80.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 73.2 s |
| `admin-categories-console.spec.ts` › CT-8 every verb is reachable from the editor with no horizontal scroll | desktop-1280 | 72.7 s |
| `ad-page.spec.ts` › AP-37 the in-page bar scrolls to each section and stays under the sub-band | mobile-360 | 72.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 68.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 58.9 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 56.4 s |
| `my-listings-ad.spec.ts` › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's | mobile-360 | 54.2 s |
| `ad-page.spec.ts` › AP-46 Save and Share sit in the title box | desktop-1280 | 50.2 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 50.0 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 50.0 s |
| `admin-translations-console.spec.ts` › TR-7 sync imports the compiled catalog and reports its counts | desktop-1280 | 49.4 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 49.2 s |
| `ad-page.spec.ts` › AP-40 an address never reveals: only the visitor's own tap does (D201 §14) | mobile-360 | 47.9 s |
| `my-listings-ad.spec.ts` › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's | desktop-1280 | 47.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39155523088-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39155523088-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39155523088-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39155523088-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39155523088-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39155523088-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39155523088-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39155523088-6
```

## shell.spec.ts › top band law (bundle 21 turn 2) › TB-1 the corner and the band line up

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    4
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    4

  2958 |           expect(
  2959 |             Math.abs((await bounds(mark)).x - (await bounds(row.locator("[data-cut-text]"))).x),
> 2960 |           ).toBeLessThanOrEqual(2);
       |             ^
  2961 |         }
  2962 |         if (width === 1280) {
  2963 |           const word = page.getByTestId("topbar-wordmark");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2960:13
```

Context:

```text
        - heading "Company" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - generic [ref=e247]: About
          - listitem [ref=e248]:
            - generic [ref=e249]: Contact
      - navigation "Help" [ref=e250]:
        - heading "Help" [level=2] [ref=e251]
        - list [ref=e252]:
          - listitem [ref=e253]:
            - generic [ref=e254]: Safety
      - navigation "Legal" [ref=e255]:
        - heading "Legal" [level=2] [ref=e256]
        - list [ref=e257]:
          - listitem [ref=e258]:
            - generic [ref=e259]: Terms
          - listitem [ref=e260]:
            - generic [ref=e261]: Privacy
    - paragraph [ref=e263]: © 2026 ethio.com — All rights reserved.
```
```

## smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 2 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="ms-1 inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden active">…</a> aka getByTestId('shell-topbar').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="footer-home" class="inline-flex min-h-11 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('footer-home')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 2 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="ms-1 inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden active">…</a> aka getByTestId('shell-topbar').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="footer-home" class="inline-flex min-h-11 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('footer-home')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })


  26 |   //    name, which holds at every breakpoint, and assert the h1 separately.
  27 |   await page.goto("/");
> 28 |   await expect(page.getByRole("link", { name: en["app.name"], exact: true })).toBeVisible();
     |                                                                               ^
  29 |   await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  30 |   await expectNoHorizontalOverflow(page);
  31 |
```

Context:

```text
        - heading "Company" [level=2] [ref=e130]
        - list [ref=e131]:
          - listitem [ref=e132]:
            - generic [ref=e133]: About
          - listitem [ref=e134]:
            - generic [ref=e135]: Contact
      - navigation "Help" [ref=e136]:
        - heading "Help" [level=2] [ref=e137]
        - list [ref=e138]:
          - listitem [ref=e139]:
            - generic [ref=e140]: Safety
      - navigation "Legal" [ref=e141]:
        - heading "Legal" [level=2] [ref=e142]
        - list [ref=e143]:
          - listitem [ref=e144]:
            - generic [ref=e145]: Terms
          - listitem [ref=e146]:
            - generic [ref=e147]: Privacy
    - paragraph [ref=e149]: © 2026 ethio.com — All rights reserved.
```
```

## smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 2 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="-ms-1.5 inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rail-icons:hidden active">…</a> aka getByTestId('shell-logo-cell').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="footer-home" class="inline-flex min-h-11 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('footer-home')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 2 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="-ms-1.5 inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rail-icons:hidden active">…</a> aka getByTestId('shell-logo-cell').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="footer-home" class="inline-flex min-h-11 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('footer-home')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })


  26 |   //    name, which holds at every breakpoint, and assert the h1 separately.
  27 |   await page.goto("/");
> 28 |   await expect(page.getByRole("link", { name: en["app.name"], exact: true })).toBeVisible();
     |                                                                               ^
  29 |   await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  30 |   await expectNoHorizontalOverflow(page);
  31 |
```

Context:

```text
        - heading "Company" [level=2] [ref=e140]
        - list [ref=e141]:
          - listitem [ref=e142]:
            - generic [ref=e143]: About
          - listitem [ref=e144]:
            - generic [ref=e145]: Contact
      - navigation "Help" [ref=e146]:
        - heading "Help" [level=2] [ref=e147]
        - list [ref=e148]:
          - listitem [ref=e149]:
            - generic [ref=e150]: Safety
      - navigation "Legal" [ref=e151]:
        - heading "Legal" [level=2] [ref=e152]
        - list [ref=e153]:
          - listitem [ref=e154]:
            - generic [ref=e155]: Terms
          - listitem [ref=e156]:
            - generic [ref=e157]: Privacy
    - paragraph [ref=e159]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-37 the in-page bar scrolls to each section and stays under the sub-band

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: Timeout 10000ms exceeded while waiting on the predicate

  1012 |     await sellerItem.click();
  1013 |     await expect(sellerItem).toHaveAttribute("aria-current", "true");
> 1014 |     await expect
       |     ^
  1015 |       .poll(async () => {
  1016 |         const heading = await page
  1017 |           .locator('section[data-testid="listing-detail-seller"]')
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1014:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e370]
        - list [ref=e371]:
          - listitem [ref=e372]:
            - generic [ref=e373]: About
          - listitem [ref=e374]:
            - generic [ref=e375]: Contact
      - navigation "Help" [ref=e376]:
        - heading "Help" [level=2] [ref=e377]
        - list [ref=e378]:
          - listitem [ref=e379]:
            - generic [ref=e380]: Safety
      - navigation "Legal" [ref=e381]:
        - heading "Legal" [level=2] [ref=e382]
        - list [ref=e383]:
          - listitem [ref=e384]:
            - generic [ref=e385]: Terms
          - listitem [ref=e386]:
            - generic [ref=e387]: Privacy
    - paragraph [ref=e389]: © 2026 ethio.com — All rights reserved.
```
```

## smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 2 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="ms-1 inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden active">…</a> aka getByTestId('shell-topbar').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="footer-home" class="inline-flex min-h-11 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('footer-home')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 2 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="ms-1 inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden active">…</a> aka getByTestId('shell-topbar').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="footer-home" class="inline-flex min-h-11 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('footer-home')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })


  26 |   //    name, which holds at every breakpoint, and assert the h1 separately.
  27 |   await page.goto("/");
> 28 |   await expect(page.getByRole("link", { name: en["app.name"], exact: true })).toBeVisible();
     |                                                                               ^
  29 |   await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  30 |   await expectNoHorizontalOverflow(page);
  31 |
```

Context:

```text
        - heading "Company" [level=2] [ref=e130]
        - list [ref=e131]:
          - listitem [ref=e132]:
            - generic [ref=e133]: About
          - listitem [ref=e134]:
            - generic [ref=e135]: Contact
      - navigation "Help" [ref=e136]:
        - heading "Help" [level=2] [ref=e137]
        - list [ref=e138]:
          - listitem [ref=e139]:
            - generic [ref=e140]: Safety
      - navigation "Legal" [ref=e141]:
        - heading "Legal" [level=2] [ref=e142]
        - list [ref=e143]:
          - listitem [ref=e144]:
            - generic [ref=e145]: Terms
          - listitem [ref=e146]:
            - generic [ref=e147]: Privacy
    - paragraph [ref=e149]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table')


  531 |         const cardTwin = width < TWIN_BOUNDARY;
  532 |         const twin = cardTwin ? page.getByTestId("data-table-cards") : page.getByRole("table");
> 533 |         await expect(twin).toBeVisible({ timeout: 20000 });
      |                            ^
  534 |         await page.getByTestId("category-search").fill(slug);
  535 |         await expect(
  536 |           cardTwin
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-console.spec.ts:533:28
```

Context:

```text
        - heading "Company" [level=2] [ref=e1578]
        - list [ref=e1579]:
          - listitem [ref=e1580]:
            - generic [ref=e1581]: About
          - listitem [ref=e1582]:
            - generic [ref=e1583]: Contact
      - navigation "Help" [ref=e1584]:
        - heading "Help" [level=2] [ref=e1585]
        - list [ref=e1586]:
          - listitem [ref=e1587]:
            - generic [ref=e1588]: Safety
      - navigation "Legal" [ref=e1589]:
        - heading "Legal" [level=2] [ref=e1590]
        - list [ref=e1591]:
          - listitem [ref=e1592]:
            - generic [ref=e1593]: Terms
          - listitem [ref=e1594]:
            - generic [ref=e1595]: Privacy
    - paragraph [ref=e1597]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › corner-block grid › the rail collapses to icons, shows a tooltip, and remembers the choice

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: locator.hover: Error: strict mode violation: getByTestId('app-rail').getByRole('link', { name: 'Home' }) resolved to 2 elements:
    1) <a href="/" aria-label="Home" aria-current="page" data-state="closed" data-status="active" data-testid="rail-category-all" class="flex min-h-11 md:pointer-fine:min-h-8 w-full items-center gap-2 rounded-md pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ps-[var(--rail-pad)] rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0 bg-nav-active font-semibold text-primary active">…</a> aka getByTestId('rail-category-all')
    2) <a data-state="closed" href="/c/home-garden" aria-label="Home & Garden" data-testid="rail-category-home-garden" class="flex min-h-11 md:pointer-fine:min-h-8 w-full items-center gap-2 rounded-md pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ps-[var(--rail-pad)] rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0 text-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground">…</a> aka getByTestId('rail-category-home-garden')

Call log:
  - waiting for getByTestId('app-rail').getByRole('link', { name: 'Home' })

--- further error 1 ---
Error: locator.hover: Error: strict mode violation: getByTestId('app-rail').getByRole('link', { name: 'Home' }) resolved to 2 elements:
    1) <a href="/" aria-label="Home" aria-current="page" data-state="closed" data-status="active" data-testid="rail-category-all" class="flex min-h-11 md:pointer-fine:min-h-8 w-full items-center gap-2 rounded-md pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ps-[var(--rail-pad)] rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0 bg-nav-active font-semibold text-primary active">…</a> aka getByTestId('rail-category-all')
    2) <a data-state="closed" href="/c/home-garden" aria-label="Home & Garden" data-testid="rail-category-home-garden" class="flex min-h-11 md:pointer-fine:min-h-8 w-full items-center gap-2 rounded-md pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ps-[var(--rail-pad)] rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0 text-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground">…</a> aka getByTestId('rail-category-home-garden')

Call log:
  - waiting for getByTestId('app-rail').getByRole('link', { name: 'Home' })


  727 |     expect(Math.abs(narrow.width - 64)).toBeLessThanOrEqual(1);
  728 |     await expect(rail.getByTestId("rail-category-all").locator("svg")).toBeVisible();
> 729 |     await rail.getByRole("link", { name: en["nav.home"] }).hover();
      |                                                            ^
  730 |     const tip = page.getByTestId("rail-tooltip");
  731 |     await expect(tip).toBeVisible();
  732 |     await expect(tip).toContainText(en["nav.home"]);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:729:60
```

Context:

```text
        - heading "Company" [level=2] [ref=e211]
        - list [ref=e212]:
          - listitem [ref=e213]:
            - generic [ref=e214]: About
          - listitem [ref=e215]:
            - generic [ref=e216]: Contact
      - navigation "Help" [ref=e217]:
        - heading "Help" [level=2] [ref=e218]
        - list [ref=e219]:
          - listitem [ref=e220]:
            - generic [ref=e221]: Safety
      - navigation "Legal" [ref=e222]:
        - heading "Legal" [level=2] [ref=e223]
        - list [ref=e224]:
          - listitem [ref=e225]:
            - generic [ref=e226]: Terms
          - listitem [ref=e227]:
            - generic [ref=e228]: Privacy
    - paragraph [ref=e230]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › top band law (bundle 21 turn 2) › TB-1 the corner and the band line up

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    4
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    4

  2958 |           expect(
  2959 |             Math.abs((await bounds(mark)).x - (await bounds(row.locator("[data-cut-text]"))).x),
> 2960 |           ).toBeLessThanOrEqual(2);
       |             ^
  2961 |         }
  2962 |         if (width === 1280) {
  2963 |           const word = page.getByTestId("topbar-wordmark");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2960:13
```

Context:

```text
        - heading "Company" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - generic [ref=e247]: About
          - listitem [ref=e248]:
            - generic [ref=e249]: Contact
      - navigation "Help" [ref=e250]:
        - heading "Help" [level=2] [ref=e251]
        - list [ref=e252]:
          - listitem [ref=e253]:
            - generic [ref=e254]: Safety
      - navigation "Legal" [ref=e255]:
        - heading "Legal" [level=2] [ref=e256]
        - list [ref=e257]:
          - listitem [ref=e258]:
            - generic [ref=e259]: Terms
          - listitem [ref=e260]:
            - generic [ref=e261]: Privacy
    - paragraph [ref=e263]: © 2026 ethio.com — All rights reserved.
```
```

## smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 2 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="-ms-1.5 inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rail-icons:hidden active">…</a> aka getByTestId('shell-logo-cell').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="footer-home" class="inline-flex min-h-11 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('footer-home')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 2 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="-ms-1.5 inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rail-icons:hidden active">…</a> aka getByTestId('shell-logo-cell').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="footer-home" class="inline-flex min-h-11 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('footer-home')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })


  26 |   //    name, which holds at every breakpoint, and assert the h1 separately.
  27 |   await page.goto("/");
> 28 |   await expect(page.getByRole("link", { name: en["app.name"], exact: true })).toBeVisible();
     |                                                                               ^
  29 |   await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  30 |   await expectNoHorizontalOverflow(page);
  31 |
```

Context:

```text
        - heading "Company" [level=2] [ref=e140]
        - list [ref=e141]:
          - listitem [ref=e142]:
            - generic [ref=e143]: About
          - listitem [ref=e144]:
            - generic [ref=e145]: Contact
      - navigation "Help" [ref=e146]:
        - heading "Help" [level=2] [ref=e147]
        - list [ref=e148]:
          - listitem [ref=e149]:
            - generic [ref=e150]: Safety
      - navigation "Legal" [ref=e151]:
        - heading "Legal" [level=2] [ref=e152]
        - list [ref=e153]:
          - listitem [ref=e154]:
            - generic [ref=e155]: Terms
          - listitem [ref=e156]:
            - generic [ref=e157]: Privacy
    - paragraph [ref=e159]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-1-3dj07b: e2e_par_8iz7yc → e2e_chi_4jd6lm
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×8
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-t13tgy: e2e_par_hlh806 → e2e_chi_0nczhn
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×7
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
