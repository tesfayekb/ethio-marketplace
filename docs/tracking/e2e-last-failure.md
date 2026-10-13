# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38419242995 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38419242995
- Commit: `48b0b91f8f35e3b78f696f1a3884b8eb55061cce`
- Attempt: 1
- Written (UTC): 2026-10-13T16:03:46.424Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 3
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · feed-route.spec.ts › FEED ROUTE › FR-4 a place with 8 listings does not widen — Error: expect(received).toBe(expected) // Object.is equality
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-73b a failed holders read shows its error, keeps the confirm disabled and removes nothing — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-resets.spec.ts › POSTING WIZARD › PW-164 an identity change keeps every detail that does not depend on it, resets the ones that do, and Undo restores them — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### feed-route.spec.ts › FEED ROUTE › FR-4 a place with 8 listings does not widen

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 502
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 502

  180 |     }
  181 |     const r = await getFeed(request, { category: seed.leaf.id, place: city });
> 182 |     expect(r.status).toBe(200);
      |                      ^
  183 |     const ids = r.body.cards.map((c) => c.id);
  184 |     expect(ids).toEqual(ordered([...five, ...three]));
  185 |     expect(r.body.ladder).toHaveLength(1);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-route.spec.ts:182:22
```

Context: context file not found for `feed-route-FEED-ROUTE-FR-4-a-place-with-8-listings-does-not-widen-mobile-360` — Playwright's name `feed-route-FEED-ROUTE-FR-4-e8a48-h-8-listings-does-not-widen-mobile-360`; this run carried 1 context file(s); of the same spec: none

### admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-73b a failed holders read shows its error, keeps the confirm disabled and removes nothing

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-remove-confirm')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-remove-confirm')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-remove-confirm')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-remove-confirm')


  265 |         .getByTestId(`attribute-actions-${held}-more-remove`)
  266 |         .click();
> 267 |       await expect(page.getByTestId("attribute-remove-confirm")).toBeVisible({ timeout: 20000 });
      |                                                                  ^
  268 |       await expect(page.getByTestId("attribute-dialog-error")).toHaveText(
  269 |         en["admin.attributes.links.error"],
  270 |         { timeout: 20000 },
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-safety.spec.ts:267:66
```

Context:

```text
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Remove from a category — e2e_held_brbuwa" [ref=e2]:
    - heading "Remove from a category — e2e_held_brbuwa" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Remove from a category — e2e_held_brbuwa
      - paragraph [ref=e6]: The attribute stays in the library; only this category stops asking for it.
      - generic [ref=e7]:
        - generic [ref=e8]: Category
        - combobox "Category" [ref=e9]:
          - option "Choose a category" [selected]
          - option "e2e-cat-4-0-zddehj (e2e-cat-4-0-zddehj)"
      - generic [ref=e10]:
        - button "Cancel" [ref=e11] [cursor=pointer]
        - button "Remove from category" [ref=e12] [cursor=pointer]
    - button "Close" [active] [ref=e13] [cursor=pointer]:
      - img [ref=e14]
      - generic [ref=e17]: Close
```
```

### post-wizard-resets.spec.ts › POSTING WIZARD › PW-164 an identity change keeps every detail that does not depend on it, resets the ones that do, and Undo restores them

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-category-search')


  138 |     expectSaved = true,
  139 |   ) {
> 140 |     await page.getByTestId("post-category-search").fill(slug);
      |                                                    ^
  141 |     const hit = page.locator(`[data-testid="post-category-hit"][data-category="${categoryId}"]`);
  142 |     await expect(hit).toBeVisible();
  143 |     await hit.click();
    at chooseBySearch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-resets.spec.ts:140:52)
    at reachStep3 (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-resets.spec.ts:192:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-resets.spec.ts:1297:23
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/categories/tree ((body unavailable))
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-164-an-identity-change-keeps-every-detail-that-does-not-depend-on-it-resets-the-ones-that-do-and-Undo-restores-them-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-e6c71-t-do-and-Undo-restores-them-desktop-1280`; this run carried 1 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

108 line(s), 38 message(s): 3 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 3, shard 5, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-asi<n>vb: e<n>e_par_s<n>m → e<n>e_chi_kf<n>uv<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-yzvtvs: e<n>e_par_<n>rtss<n> → e<n>e_chi_fwybng` (quiet) | 1 | shard 1 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 1 | shard 2 |
| `upstream returned an HTML error page (<n>)` | 1 | shard 6 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-asi<n>vb: e<n>e_par_s<n>m → e<n>e_chi_kf<n>uv<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-yzvtvs: e<n>e_par_<n>rtss<n> → e<n>e_chi_fwybng ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 3, shard 5, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · /settings shows the Account context, and returning shows categories ×1 · LY-6 at 360 the open currency list is above the sticky action bar ×1 · PR-41 the door refuses an answer the chosen options do not allow ×1 · PW-145 an over-limit options read says so under its control, and a second open l ×1 · PW-152 a two-pair condition shows its row only when both answers match ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 1 · Sources: shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): FE-6 a listing written active is indexed by itself ×1 · FR-4 a place with 8 listings does not widen ×1

```text
[WebServer] [ssr-error] /api/feed Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

### upstream returned an HTML error page (<n>)

- Count: 1 · Sources: shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-74 a step-3 round trip keeps every answer (INC-329, small model list) ×1 · PW-77 the first refused field's label lands below the header (D2, reduce) ×1

```text
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (502)
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-13T15:33:18.284Z | 16.2 min |
| email | 2026-10-13T15:33:15.187Z | 0.2 min |
| shard 1 | 2026-10-13T15:33:11.900Z | 29.8 min |
| shard 2 | 2026-10-13T15:33:12.422Z | 28.6 min |
| shard 3 | 2026-10-13T15:33:19.406Z | 29.5 min |
| shard 4 | 2026-10-13T15:33:13.434Z | 30.1 min |
| shard 5 | 2026-10-13T15:33:14.485Z | 27.7 min |
| shard 6 | 2026-10-13T15:34:01.340Z | 23.7 min |
| changed | 2026-10-13T15:33:15.709Z | 5.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 23.0 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 64 | 20.0 min | shard 2, shard 5, changed |
| `shell.spec.ts` | 336 | 19.6 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 18.5 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 54 | 15.3 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 13.9 min | shard 3, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 13.8 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 50 | 12.8 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 11.2 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 11.2 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 10.3 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 52 | 9.8 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 44 | 9.7 min | smoke, shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 9.5 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 26 | 8.5 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.3 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 8.1 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.8 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 28 | 7.8 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 7.8 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.6 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 34 | 7.0 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.8 min | shard 3, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.3 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 16 | 5.9 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 42 | 5.8 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 5.6 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.1 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 4.3 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.5 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 3.5 min | shard 2, shard 5 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.8 min | shard 3, shard 6 |
| `posting-routes-dials.spec.ts` | 14 | 2.7 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.1 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.0 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.5 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-resets.spec.ts` › PW-164 an identity change keeps every detail that does not depend on it, resets the ones that do, and Undo restores them | desktop-1280 | 90.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 52.8 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 49.6 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 48.1 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 47.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 47.9 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 47.4 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 44.7 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 43.9 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 39.4 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 39.2 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 38.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 38.4 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 38.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 38.2 s |
