# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38449595471
- Commit: `86a439199fc3e764fe3159961820da362755fbad`
- Attempt: 1
- Written (UTC): 2026-10-13T19:30:45.798Z
- Passed: 1615 · Skipped: 126 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-place.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored — Error: PW-12: saving the step did not claim the name
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard-place.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored — Error: PW-12: saving the step did not claim the name

## Flaky bodies (DEC-078)

### post-wizard-place.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PW-12: saving the step did not claim the name

expect(received).toBe(expected) // Object.is equality

Expected: "e2e_0xetyz"
Received: null
--- further error 1 ---
Error: PW-12: saving the step did not claim the name

expect(received).toBe(expected) // Object.is equality

Expected: "e2e_0xetyz"
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

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-12-who-the-alias-is-checked-against-the-door-messages-cannot-be-switched-off-and-a-shown-channel-is-stored-mobile-360` — Playwright's name `post-wizard-place-POSTING--17792-d-a-shown-channel-is-stored-mobile-360`; this run carried 0 context file(s); of the same spec: none

### post-wizard-place.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: PW-12: saving the step did not claim the name

expect(received).toBe(expected) // Object.is equality

Expected: "e2e_wu0avk"
Received: null
--- further error 1 ---
Error: PW-12: saving the step did not claim the name

expect(received).toBe(expected) // Object.is equality

Expected: "e2e_wu0avk"
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

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-12-who-the-alias-is-checked-against-the-door-messages-cannot-be-switched-off-and-a-shown-channel-is-stored-desktop-1280` — Playwright's name `post-wizard-place-POSTING--17792-d-a-shown-channel-is-stored-desktop-1280`; this run carried 0 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

105 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 5 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>pqka<n>: e<n>e_par_uz<n>ox<n> → e<n>e_chi_<n>q<n>c<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-rrbzcy: e<n>e_par_qcwvdh → e<n>e_chi_vmw<n>u` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>pqka<n>: e<n>e_par_uz<n>ox<n> → e<n>e_chi_<n>q<n>c<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-rrbzcy: e<n>e_par_qcwvdh → e<n>e_chi_vmw<n>u ×1

Off the allowlist:

### listing not found

- Count: 5 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-145 an over-limit options read says so under its control, and a second open l ×1 · PW-17 the currency is preselected and searchable by name in one control ×1 · PW-49 a prefill-only fact keeps its input while a settled one does not ×1 · PW-50 the specifications show every row open in display order (D41) ×1

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
| smoke | 2026-10-13T18:56:46.794Z | 15.5 min |
| email | 2026-10-13T18:56:53.938Z | 0.2 min |
| shard 1 | 2026-10-13T18:56:45.154Z | 31.0 min |
| shard 2 | 2026-10-13T18:56:55.052Z | 30.1 min |
| shard 3 | 2026-10-13T18:56:44.113Z | 27.0 min |
| shard 4 | 2026-10-13T18:57:01.930Z | 33.4 min |
| shard 5 | 2026-10-13T18:56:44.013Z | 29.8 min |
| shard 6 | 2026-10-13T18:56:54.378Z | 27.5 min |
| changed | 2026-10-13T18:57:10.227Z | 0.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 23.7 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 19.8 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 19.7 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 54 | 17.8 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 50 | 14.1 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 12.8 min | shard 3, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 12.7 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 36 | 12.1 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 52 | 11.6 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 48 | 11.4 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 11.4 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.1 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 10.1 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 9.3 min | smoke, shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.3 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 28 | 9.1 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 8.5 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.4 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 8.1 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 7.9 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.6 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 7.5 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 34 | 7.0 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.7 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 16 | 6.2 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 5.9 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 28 | 5.9 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 42 | 5.7 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.0 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.0 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 3.5 min | shard 2, shard 5 |
| `admin-categories-home.spec.ts` | 10 | 3.4 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 3.0 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.6 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.2 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.9 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.8 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `admin-services.spec.ts` | 12 | 1.5 min | shard 1, shard 4, changed |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.8 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 52.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 51.8 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 50.1 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 49.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 47.9 s |
| `posting-routes-identity.spec.ts` › PR-26 the imitation check is rate-gated before the model is asked | desktop-1280 | 46.1 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 44.4 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 44.1 s |
| `post-wizard-place.spec.ts` › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored | mobile-360 | 43.9 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | desktop-1280 | 42.4 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 42.0 s |
| `post-wizard-place.spec.ts` › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored | desktop-1280 | 41.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 40.4 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 40.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 40.0 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38449595471-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38449595471-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38449595471-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 38449595471-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38449595471-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38449595471-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 38449595471-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38449595471-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38449595471-changed
```

## admin-services.spec.ts › ADMIN › SERVICES — the AI switches and meter (D158) › SV-3 the meter on the app's own connection: today's row, the alerts and off at the budget

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    "ai.budget_alert",
-   "ai.budget_alert",
    "ai.budget_off",
+   "ai.budget_alert",
  ]
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    "ai.budget_alert",
-   "ai.budget_alert",
    "ai.budget_off",
+   "ai.budget_alert",
  ]

  262 |       expect(total).toEqual({ calls: 3, units: 10, cost: 10000 });
  263 |
> 264 |       expect(await auditActions(feature)).toEqual([
      |                                           ^
  265 |         "ai.budget_alert",
  266 |         "ai.budget_alert",
  267 |         "ai.budget_off",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-services.spec.ts:264:43
```

Context: context file not found for `admin-services-ADMIN-SERVICES-the-AI-switches-and-meter-D158-SV-3-the-meter-on-the-app-s-own-connection-today-s-row-the-alerts-and-off-at-the-budget-mobile-360` — Playwright's name `admin-services-ADMIN-›-SER-22ccc-lerts-and-off-at-the-budget-mobile-360`; this run carried 0 context file(s); of the same spec: none

## admin-services.spec.ts › ADMIN › SERVICES — the AI switches and meter (D158) › SV-3 the meter on the app's own connection: today's row, the alerts and off at the budget

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    "ai.budget_alert",
-   "ai.budget_alert",
    "ai.budget_off",
+   "ai.budget_alert",
  ]
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    "ai.budget_alert",
-   "ai.budget_alert",
    "ai.budget_off",
+   "ai.budget_alert",
  ]

  262 |       expect(total).toEqual({ calls: 3, units: 10, cost: 10000 });
  263 |
> 264 |       expect(await auditActions(feature)).toEqual([
      |                                           ^
  265 |         "ai.budget_alert",
  266 |         "ai.budget_alert",
  267 |         "ai.budget_off",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-services.spec.ts:264:43
```

Context: context file not found for `admin-services-ADMIN-SERVICES-the-AI-switches-and-meter-D158-SV-3-the-meter-on-the-app-s-own-connection-today-s-row-the-alerts-and-off-at-the-budget-desktop-1280` — Playwright's name `admin-services-ADMIN-›-SER-22ccc-lerts-and-off-at-the-budget-desktop-1280`; this run carried 0 context file(s); of the same spec: none

## admin-services.spec.ts › ADMIN › SERVICES — the AI switches and meter (D158) › SV-3 the meter on the app's own connection: today's row, the alerts and off at the budget

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    "ai.budget_alert",
-   "ai.budget_alert",
    "ai.budget_off",
+   "ai.budget_alert",
  ]
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    "ai.budget_alert",
-   "ai.budget_alert",
    "ai.budget_off",
+   "ai.budget_alert",
  ]

  262 |       expect(total).toEqual({ calls: 3, units: 10, cost: 10000 });
  263 |
> 264 |       expect(await auditActions(feature)).toEqual([
      |                                           ^
  265 |         "ai.budget_alert",
  266 |         "ai.budget_alert",
  267 |         "ai.budget_off",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-services.spec.ts:264:43
```

Context: context file not found for `admin-services-ADMIN-SERVICES-the-AI-switches-and-meter-D158-SV-3-the-meter-on-the-app-s-own-connection-today-s-row-the-alerts-and-off-at-the-budget-mobile-360` — Playwright's name `admin-services-ADMIN-›-SER-22ccc-lerts-and-off-at-the-budget-mobile-360`; this run carried 0 context file(s); of the same spec: none

## admin-services.spec.ts › ADMIN › SERVICES — the AI switches and meter (D158) › SV-3 the meter on the app's own connection: today's row, the alerts and off at the budget

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    "ai.budget_alert",
-   "ai.budget_alert",
    "ai.budget_off",
+   "ai.budget_alert",
  ]
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    "ai.budget_alert",
-   "ai.budget_alert",
    "ai.budget_off",
+   "ai.budget_alert",
  ]

  262 |       expect(total).toEqual({ calls: 3, units: 10, cost: 10000 });
  263 |
> 264 |       expect(await auditActions(feature)).toEqual([
      |                                           ^
  265 |         "ai.budget_alert",
  266 |         "ai.budget_alert",
  267 |         "ai.budget_off",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-services.spec.ts:264:43
```

Context: context file not found for `admin-services-ADMIN-SERVICES-the-AI-switches-and-meter-D158-SV-3-the-meter-on-the-app-s-own-connection-today-s-row-the-alerts-and-off-at-the-budget-desktop-1280` — Playwright's name `admin-services-ADMIN-›-SER-22ccc-lerts-and-off-at-the-budget-desktop-1280`; this run carried 0 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-8pqka9: e2e_par_uz7ox3 → e2e_chi_6q7c73
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-rrbzcy: e2e_par_qcwvdh → e2e_chi_vmw82u
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
