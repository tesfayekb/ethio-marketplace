# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39038155204
- Commit: `36342ce92c65ae14604547cee5d6b7db7a22370c`
- Attempt: 1
- Written (UTC): 2026-10-17T14:48:03.640Z
- Passed: 1882 · Skipped: 126 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

109 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 9 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-fay<n>pt: e<n>e_par_gb<n>da → e<n>e_chi_<n>f<n>b` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-y<n>jue: e<n>e_par_<n>xqs<n> → e<n>e_chi_e<n>b<n>r` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-fay<n>pt: e<n>e_par_gb<n>da → e<n>e_chi_<n>f<n>b ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-y<n>jue: e<n>e_par_<n>xqs<n> → e<n>e_chi_e<n>b<n>r ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-33 a region alone never lists itself; its city does (W6 R2) ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · admin panel is absent for a normal signed-in user ×1 · LY-6 at 360 the open currency list is above the sticky action bar ×1 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1

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
| smoke | 2026-10-17T14:04:16.011Z | 17.3 min |
| email | 2026-10-17T14:04:02.214Z | 0.2 min |
| shard 1 | 2026-10-17T14:04:18.225Z | 38.5 min |
| shard 2 | 2026-10-17T14:04:05.849Z | 36.5 min |
| shard 3 | 2026-10-17T14:04:06.904Z | 33.6 min |
| shard 4 | 2026-10-17T14:04:16.011Z | 43.4 min |
| shard 5 | 2026-10-17T14:04:08.013Z | 37.2 min |
| shard 6 | 2026-10-17T14:04:06.157Z | 33.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 24.2 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 23.4 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 20.1 min | shard 1, shard 4 |
| `shell.spec.ts` | 336 | 19.7 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 16.8 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 16.0 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 64 | 14.1 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 13.3 min | shard 3, shard 6 |
| `ad-page.spec.ts` | 34 | 13.3 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.2 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 36 | 12.7 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 12.2 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 12.0 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 28 | 11.6 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 11.1 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 11.1 min | smoke, shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 11.1 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 11.1 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 9.5 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.4 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 9.2 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 9.1 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.9 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 7.6 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.5 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 7.4 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 7.3 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.2 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.0 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.7 min | shard 1, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.5 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.2 min | shard 3, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 6.2 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 5.7 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.0 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.4 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.3 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.2 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.9 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 1.8 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.7 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.2 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 0.7 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.2 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 68.8 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 60.3 s |
| `ad-page-doors.spec.ts` › AP-25 no client reads or writes saved_listings; the save dial counts new rows only (D201 §8) | desktop-1280 | 57.7 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 53.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 50.2 s |
| `ad-page-doors.spec.ts` › AP-25 no client reads or writes saved_listings; the save dial counts new rows only (D201 §8) | mobile-360 | 49.7 s |
| `ad-page.spec.ts` › AP-32 similar ads: up to six of the same leaf and place, the ad itself never among them; none on a sold ad | desktop-1280 | 46.0 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 45.2 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | mobile-360 | 44.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 43.9 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 43.7 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 42.9 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 41.8 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 41.4 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 41.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39038155204-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39038155204-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 4, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 39038155204-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39038155204-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39038155204-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39038155204-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39038155204-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39038155204-6
```

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-25 no client reads or writes saved_listings; the save dial counts new rows only (D201 §8)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toMatchObject(expected)

- Expected  - 2
+ Received  + 1

  Object {
-   "ok": true,
-   "saved": true,
+   "ok": false,
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  - 2
+ Received  + 1

  Object {
-   "ok": true,
-   "saved": true,
+   "ok": false,
  }

  869 |       const secondAd = await buyer.rpc("save_listing", { p_public_id: idB });
  870 |       expect(secondAd.error).toBeNull();
> 871 |       expect(secondAd.data).toMatchObject({ ok: true, saved: true });
      |                             ^
  872 |       const repeat = await buyer.rpc("save_listing", { p_public_id: idB });
  873 |       expect(repeat.error).toBeNull();
  874 |       expect(repeat.data).toMatchObject({ ok: true, saved: true });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:871:29
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-25-no-client-reads-or-writes-saved_listings-the-save-dial-counts-new-rows-only-D201-8-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-6e5ba-unts-new-rows-only-D201-§8--mobile-360`; this run carried 0 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:al31] clearing scratch grants failed: base user role cannot be removed
--- further error 1 ---
Error: [e2e:al31] clearing scratch grants failed: base user role cannot be removed

  2181 |       const old = await supabase.from("user_roles").delete().eq("user_id", buyer.id);
  2182 |       if (old.error)
> 2183 |         throw new Error(`[e2e:al31] clearing scratch grants failed: ${old.error.message}`);
       |               ^
  2184 |       const name = `e2e_listings_role_${token()}`;
  2185 |       const role = await supabase
  2186 |         .from("roles")
    at holder (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2183:15)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2215:5
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-31-Reports-the-open-count-on-the-row-and-the-reasons-on-the-listing-s-page-for-listings-review-nothing-for-listings-view-alone-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-fab8b-ing-for-listings-view-alone-mobile-360`; this run carried 0 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-25 no client reads or writes saved_listings; the save dial counts new rows only (D201 §8)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toMatchObject(expected)

- Expected  - 2
+ Received  + 1

  Object {
-   "ok": true,
-   "saved": true,
+   "ok": false,
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  - 2
+ Received  + 1

  Object {
-   "ok": true,
-   "saved": true,
+   "ok": false,
  }

  869 |       const secondAd = await buyer.rpc("save_listing", { p_public_id: idB });
  870 |       expect(secondAd.error).toBeNull();
> 871 |       expect(secondAd.data).toMatchObject({ ok: true, saved: true });
      |                             ^
  872 |       const repeat = await buyer.rpc("save_listing", { p_public_id: idB });
  873 |       expect(repeat.error).toBeNull();
  874 |       expect(repeat.data).toMatchObject({ ok: true, saved: true });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:871:29
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-25-no-client-reads-or-writes-saved_listings-the-save-dial-counts-new-rows-only-D201-8-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-6e5ba-unts-new-rows-only-D201-§8--desktop-1280`; this run carried 0 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:al31] clearing scratch grants failed: base user role cannot be removed
--- further error 1 ---
Error: [e2e:al31] clearing scratch grants failed: base user role cannot be removed

  2181 |       const old = await supabase.from("user_roles").delete().eq("user_id", buyer.id);
  2182 |       if (old.error)
> 2183 |         throw new Error(`[e2e:al31] clearing scratch grants failed: ${old.error.message}`);
       |               ^
  2184 |       const name = `e2e_listings_role_${token()}`;
  2185 |       const role = await supabase
  2186 |         .from("roles")
    at holder (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2183:15)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2215:5
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-31-Reports-the-open-count-on-the-row-and-the-reasons-on-the-listing-s-page-for-listings-review-nothing-for-listings-view-alone-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-fab8b-ing-for-listings-view-alone-desktop-1280`; this run carried 0 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-3-fay8pt: e2e_par_gb15da → e2e_chi_7f514b
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
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-y13jue: e2e_par_44xqs8 → e2e_chi_e08b5r
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).
