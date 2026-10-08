# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 37745210593 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37745210593
- Commit: `b7a4a151840a3d6a34cf76d74707072b7ab15136`
- Attempt: 1
- Written (UTC): 2026-10-08T08:12:50.283Z
- Post-test warnings: 24
- Flaky (passed on retry, DEC-030, non-gating): 2

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-33 the map fallback report is capped at 60 an hour per address — Error: expect(received).toBe(expected) // Object.is equality

## Flaky bodies (DEC-078)

### shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('location-level-city')
Expected pattern: /Escratch Guess City viqx/
Received string:  "Escratch Guess City uotawpqx"
Timeout: 10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('location-level-city')
    11 × locator resolved to <button type="button" id="radix-_r_4_" data-state="closed" aria-haspopup="menu" aria-expanded="false" data-testid="location-level-city" title="Escratch Guess City uotawpqx" aria-label="City: Escratch Guess City uotawpqx" class="inline-flex h-8 min-w-[6ch] shrink items-center gap-1 rounded-md px-2 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring font-medium text-foreground">…</button>
       - unexpected value "Escratch Guess City uotawpqx"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('location-level-city')
Expected pattern: /Escratch Guess City viqx/
Received string:  "Escratch Guess City uotawpqx"
Timeout: 10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('location-level-city')
    11 × locator resolved to <button type="button" id="radix-_r_4_" data-state="closed" aria-haspopup="menu" aria-expanded="false" data-testid="location-level-city" title="Escratch Guess City uotawpqx" aria-label="City: Escratch Guess City uotawpqx" class="inline-flex h-8 min-w-[6ch] shrink items-center gap-1 rounded-md px-2 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring font-medium text-foreground">…</button>
       - unexpected value "Escratch Guess City uotawpqx"


  2303 |       await waitForTreeSlug(page, "ET", fixture.city.slug);
  2304 |       await gotoReady(page, "/");
> 2305 |       await expect(page.getByTestId("location-level-city")).toHaveText(
       |                                                             ^
  2306 |         new RegExp(escapeRe(fixture.cityName)),
  2307 |       );
```

Context: context file not found for `shell-L4b-location-picker-LS-6-the-nearest-curated-metro-wins-by-geometry-mobile-360`

### posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-33 the map fallback report is capped at 60 an hour per address

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true

  210 |     }
  211 |     expect(answers.slice(0, 60).every(Boolean), JSON.stringify(answers)).toBe(true);
> 212 |     expect(answers[60]).toBe(false);
      |                         ^
  213 |   });
  214 | });
  215 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:212:25
```

Context: context file not found for `posting-routes-dials-POSTING-DOOR-DIALS-PR-33-the-map-fallback-report-is-capped-at-60-an-hour-per-address-mobile-360`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

106 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 5 | shard 2, shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-jkdhj<n>: e<n>e_par_sie<n>gs → e<n>e_chi_<n>fmaje` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-tfsl<n>: e<n>e_par_<n>pwky → e<n>e_chi_<n>j<n>` (quiet) | 1 | shard 1 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 1 | shard 6 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-jkdhj<n>: e<n>e_par_sie<n>gs → e<n>e_chi_<n>fmaje ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-tfsl<n>: e<n>e_par_<n>pwky → e<n>e_chi_<n>j<n> ×1

Off the allowlist:

### listing not found

- Count: 5 · Sources: shard 2, shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 1 · Sources: shard 6

```text
[WebServer] [ssr-error] /api/i18n Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-08T07:45:42.723Z | 15.3 min |
| email | 2026-10-08T07:45:36.797Z | 0.2 min |
| shard 1 | 2026-10-08T07:46:04.974Z | 23.8 min |
| shard 2 | 2026-10-08T07:45:40.970Z | 21.5 min |
| shard 3 | 2026-10-08T07:45:36.719Z | 21.2 min |
| shard 4 | 2026-10-08T07:46:04.999Z | 24.3 min |
| shard 5 | 2026-10-08T07:46:01.240Z | 26.4 min |
| shard 6 | 2026-10-08T07:45:40.788Z | 16.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 23.2 min | shard 3, shard 6 |
| `shell.spec.ts` | 316 | 18.6 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 17.2 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 11.5 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 42 | 11.3 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 11.3 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 48 | 11.1 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 30 | 10.4 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 10.0 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 9.3 min | shard 3, shard 5 |
| `auth-signout.spec.ts` | 44 | 9.2 min | smoke, shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 8.8 min | shard 3, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 8.2 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 7.9 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 7.7 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.3 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 6.5 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 6.4 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 6.4 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 24 | 6.1 min | shard 1, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.0 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 38 | 5.3 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 14 | 4.9 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.8 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 3.2 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 16 | 3.2 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 3.0 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 8 | 2.7 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.0 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 14 | 1.6 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 1.5 min | shard 3, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.4 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.0 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 4, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.4 min | shard 3, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 8 | 0.3 min | shard 2, shard 5 |
| `house-style.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 48.9 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 44.1 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 43.9 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 42.3 s |
| `posting-routes-dials.spec.ts` › PR-33 the map fallback report is capped at 60 an hour per address | mobile-360 | 40.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 40.4 s |
| `post-wizard-specs.spec.ts` › PW-159 a list fact ticks its tick list once, and the seller's untick stays | mobile-360 | 40.1 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 39.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 38.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 38.0 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 36.1 s |
| `post-wizard-where.spec.ts` › PW-98 the item tick sits on the city line, fresh and prefilled | desktop-1280 | 35.9 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 35.6 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 34.9 s |
