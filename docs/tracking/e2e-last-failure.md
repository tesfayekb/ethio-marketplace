# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38215613134 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38215613134
- Commit: `4e111104bfe5bd15ad6195c71abb819af429432b`
- Attempt: 1
- Written (UTC): 2026-10-12T07:35:56.093Z
- Post-test warnings: 33
- Flaky (passed on retry, DEC-030, non-gating): 2

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-178 a late read of the place text never replaces a newer save — Error: PW-178: the held answer was not the older text
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard-place.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored — Error: PW-12: saving the step did not claim the name

## Flaky bodies (DEC-078)

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-178 a late read of the place text never replaces a newer save

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PW-178: the held answer was not the older text

expect(received).toBeNull()

Received: "Behind the blue gate, 2nd floor"
--- further error 1 ---
Error: PW-178: the held answer was not the older text

expect(received).toBeNull()

Received: "Behind the blue gate, 2nd floor"

  292 |     release();
  293 |     await answered;
> 294 |     expect(staleDirections, "PW-178: the held answer was not the older text").toBeNull();
      |                                                                               ^
  295 |     expect(deliveredAfterSave, "PW-178: the held answer arrived before the save").toBe(true);
  296 |
  297 |     await savePinOnMap(page, 120, 90);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:294:79
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-178-a-late-read-of-the-place-text-never-replaces-a-newer-save-mobile-360`

### post-wizard-place.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `changed`
- Project: `mobile-360`

```text
Error: PW-12: saving the step did not claim the name

expect(received).toBe(expected) // Object.is equality

Expected: "e2e_98jjfp"
Received: null
--- further error 1 ---
Error: PW-12: saving the step did not claim the name

expect(received).toBe(expected) // Object.is equality

Expected: "e2e_98jjfp"
Received: null

  531 |       "PW-12: messages was not stored true",
  532 |     ).toBe(true);
> 533 |     expect((await identityOf(user.id)).alias, "PW-12: saving the step did not claim the name").toBe(
      |                                                                                                ^
  534 |       wanted,
  535 |     );
  536 |   });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:533:96
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-12-who-the-alias-is-checked-against-the-door-messages-cannot-be-switched-off-and-a-shown-channel-is-stored-mobile-360`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

115 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 15 | shard 4, shard 7, shard 8, changed |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 5, shard 7 |
| `too many previews` (quiet) | 10 | shard 3, shard 7 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `categories file too large` (quiet) | 2 | shard 3, shard 7 |
| `categories nulByte` (quiet) | 2 | shard 3, shard 7 |
| `categories unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 5 |
| `countries badHeader` (quiet) | 2 | shard 3, shard 7 |
| `countries nulByte` (quiet) | 2 | shard 3, shard 7 |
| `countries tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `countries unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `countries wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `definitions nulByte` (quiet) | 2 | shard 3, shard 7 |
| `definitions tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `definitions unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `links unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `locations badHeader` (quiet) | 2 | shard 3, shard 7 |
| `locations file too large` (quiet) | 2 | shard 3, shard 7 |
| `locations nulByte` (quiet) | 2 | shard 3, shard 7 |
| `locations unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `locations wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `strings badHeader` (quiet) | 2 | shard 3, shard 7 |
| `strings emptyFile` (quiet) | 2 | shard 3, shard 7 |
| `strings nulByte` (quiet) | 2 | shard 3, shard 7 |
| `strings tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `strings unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `strings wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-suhj<n>: e<n>e_par_so<n>suj → e<n>e_chi_qzyfa<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ywu<n>oh: e<n>e_par_qgm<n>x<n> → e<n>e_chi_gtpgf<n>` (quiet) | 1 | shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-suhj<n>: e<n>e_par_so<n>suj → e<n>e_chi_qzyfa<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ywu<n>oh: e<n>e_par_qgm<n>x<n> → e<n>e_chi_gtpgf<n> ×1

Off the allowlist:

### listing not found

- Count: 15 · Sources: shard 4, shard 7, shard 8, changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-12T07:04:19.449Z | 20.4 min |
| email | 2026-10-12T07:04:18.660Z | 0.3 min |
| shard 1 | 2026-10-12T07:04:11.706Z | 24.0 min |
| shard 2 | 2026-10-12T07:04:12.954Z | 27.3 min |
| shard 3 | 2026-10-12T07:04:14.083Z | 28.6 min |
| shard 4 | 2026-10-12T07:04:16.878Z | 31.3 min |
| shard 5 | 2026-10-12T07:04:28.399Z | 26.4 min |
| shard 6 | 2026-10-12T07:04:08.022Z | 21.8 min |
| shard 7 | 2026-10-12T07:04:17.685Z | 29.6 min |
| shard 8 | 2026-10-12T07:04:15.370Z | 29.8 min |
| changed | 2026-10-12T07:04:11.034Z | 19.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 35.2 min | shard 4, shard 8 |
| `post-wizard-pricing.spec.ts` | 100 | 30.9 min | shard 3, shard 7, changed |
| `post-wizard-place.spec.ts` | 76 | 30.0 min | shard 3, shard 7, changed |
| `post-wizard-bundle2.spec.ts` | 66 | 28.1 min | shard 3, shard 7 |
| `admin-listings.spec.ts` | 54 | 24.9 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 21.4 min | smoke, shard 4, shard 8 |
| `post-wizard-resets.spec.ts` | 34 | 18.7 min | shard 4, shard 8 |
| `post-wizard-category.spec.ts` | 46 | 18.6 min | shard 3, shard 7 |
| `post-wizard-where.spec.ts` | 32 | 16.9 min | shard 4, shard 8 |
| `admin-screening.spec.ts` | 30 | 16.6 min | shard 2, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 50 | 15.7 min | shard 1, shard 5 |
| `feed-screens.spec.ts` | 28 | 15.2 min | shard 3, shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 12.9 min | shard 1, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 10.8 min | shard 1, shard 5 |
| `auth-signout.spec.ts` | 44 | 10.8 min | smoke, shard 2, shard 6 |
| `admin-attributes-links.spec.ts` | 32 | 10.1 min | shard 1, shard 5 |
| `admin-locations.spec.ts` | 38 | 9.8 min | shard 2, shard 6 |
| `photo-pipeline.spec.ts` | 20 | 9.4 min | shard 3, shard 7 |
| `admin-attributes-import.spec.ts` | 40 | 9.0 min | shard 1, shard 5 |
| `posting-routes.spec.ts` | 50 | 8.7 min | shard 4, shard 8 |
| `admin-translations-console.spec.ts` | 42 | 8.7 min | shard 2, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 8.3 min | shard 4, shard 8 |
| `import-security.spec.ts` | 34 | 8.1 min | shard 3, shard 7 |
| `admin-users.spec.ts` | 26 | 8.1 min | shard 2, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 7.3 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 7.1 min | shard 2, shard 6 |
| `admin-roles.spec.ts` | 26 | 7.0 min | shard 2, shard 6 |
| `admin-attributes-safety.spec.ts` | 14 | 6.2 min | shard 1, shard 5 |
| `viewing-place.spec.ts` | 22 | 5.8 min | shard 4, shard 8 |
| `feed-route.spec.ts` | 16 | 4.9 min | shard 2, shard 6 |
| `admin-audit.spec.ts` | 12 | 4.6 min | shard 1, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 4.5 min | shard 4, shard 8 |
| `admin-countries.spec.ts` | 18 | 3.9 min | shard 1, shard 5 |
| `admin-categories-home.spec.ts` | 8 | 3.5 min | shard 1, shard 5 |
| `admin-shell.spec.ts` | 10 | 3.5 min | shard 2, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 3.2 min | shard 2, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 3.1 min | shard 4, shard 8 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.8 min | shard 3, shard 7 |
| `post-wizard-details.spec.ts` | 8 | 2.6 min | shard 3, shard 7 |
| `post-wizard-finder.spec.ts` | 8 | 2.1 min | shard 3, shard 7 |
| `admin-coverage.spec.ts` | 14 | 2.0 min | shard 1, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.7 min | shard 4, shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 1.4 min | shard 4, shard 8 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.2 min | shard 4, shard 8 |
| `i18n-coverage.spec.ts` | 8 | 1.1 min | shard 3, shard 7 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 3, shard 7 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 3, shard 7 |
| `a11y.spec.ts` | 4 | 1.0 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 4, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.8 min | shard 3, shard 7 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 4, shard 8 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 4 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 3, shard 7 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 4, shard 8 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 4, shard 8 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 73.6 s |
| `post-wizard-place.spec.ts` › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored | mobile-360 | 70.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 67.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 65.5 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | mobile-360 | 58.5 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | mobile-360 | 56.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 56.6 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | desktop-1280 | 56.5 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 56.3 s |
| `admin-screening.spec.ts` › SC-8 a person who is not a reviewer reads nothing; a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) | mobile-360 | 55.4 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 53.4 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 53.4 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | desktop-1280 | 53.3 s |
| `admin-screening.spec.ts` › SC-8 a person who is not a reviewer reads nothing; a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) | desktop-1280 | 53.3 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 52.7 s |
