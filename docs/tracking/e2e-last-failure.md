# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38131355354 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38131355354
- Commit: `cf7187ab5c6dce8f28019a499533c2133b2731b3`
- Attempt: 1
- Written (UTC): 2026-10-11T10:50:21.455Z
- Post-test warnings: 33
- Flaky (passed on retry, DEC-030, non-gating): 3

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-categories-console.spec.ts › C2 categories console › CT-7 step-up: the server refuses the write until AAL2 is proven — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 8` · post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-173 a draft placed in another market opens there, on resume and after Back — Error: [e2e:l2a] no anchor in QX: no row
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-3 Edit refuses: no permission, a reviewer, no second factor, the admin's own, a draft, a removed listing — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### admin-categories-console.spec.ts › C2 categories console › CT-7 step-up: the server refuses the write until AAL2 is proven

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-5-0-stl3ak')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-5-0-stl3ak')

[dialog-dump findRow(e2e-cat-5-0-stl3ak)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-5-0-stl3ak) after create] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-5-0-stl3ak')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-5-0-stl3ak')

[dialog-dump findRow(e2e-cat-5-0-stl3ak)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-5-0-stl3ak) after create] open dialogs: none

   at helpers/categories.ts:354

  352 |     await findRow(page, slug);
  353 |   } catch (error) {
> 354 |     throw new Error(`${error instanceof Error ? error.message : String(error)}\n${afterCreate}`);
      |           ^
```

Context:

```text
          - listitem [ref=e277]:
            - generic [ref=e278]: About
          - listitem [ref=e279]:
            - generic [ref=e280]: How it works
      - navigation "Help" [ref=e281]:
        - heading "Help" [level=2] [ref=e282]
        - list [ref=e283]:
          - listitem [ref=e284]:
            - generic [ref=e285]: Safety
          - listitem [ref=e286]:
            - generic [ref=e287]: Contact
      - navigation "Legal" [ref=e288]:
        - heading "Legal" [level=2] [ref=e289]
        - list [ref=e290]:
          - listitem [ref=e291]:
            - generic [ref=e292]: Terms
          - listitem [ref=e293]:
            - generic [ref=e294]: Privacy
    - paragraph [ref=e296]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-173 a draft placed in another market opens there, on resume and after Back

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: [e2e:l2a] no anchor in QX: no row
--- further error 1 ---
Error: [e2e:l2a] no anchor in QX: no row

   at helpers/locations.ts:314

  312 |     .maybeSingle();
  313 |   if (error || !data) {
> 314 |     throw new Error(`[e2e:l2a] no anchor in ${countryCode}: ${error?.message ?? "no row"}`);
      |           ^
  315 |   }
  316 |   return data;
  317 | }
    at anchorOf (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:314:11)
    at seedScratchChain (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:343:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:999:15
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-173-a-draft-placed-in-another-market-opens-there-on-resume-and-after-Back-desktop-1280`

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-3 Edit refuses: no permission, a reviewer, no second factor, the admin's own, a draft, a removed listing

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "a removed listing is not edited"
Received: "listing not found"

  418 |     );
  419 |     expect((await edit(draft.id, { title: "A draft" })).error).toBe("listing not found");
> 420 |     expect((await edit(removed.id, { title: "Removed" })).error).toBe(
      |                                                                  ^
  421 |       "a removed listing is not edited",
  422 |     );
  423 |     expect((await edit(target.id, { seller_id: user.id })).error).toBe("not editable: seller_id");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:420:66
--- further error 2 ---
Error: [e2e:reap] location f19a7066-bb8d-4a0e-8cb4-e9c0272faf0c failed: update or delete on table "locations" violates foreign key constraint "listings_location_id_fkey" on table "listings"

   at helpers/locations.ts:272

  270 |     const deleted = await supabase.from("locations").delete().eq("id", id);
  271 |     if (deleted.error)
> 272 |       throw new Error(`[e2e:reap] location ${id} failed: ${deleted.error.message}`);
      |             ^
  273 |   }
  274 | }
  275 |
    at destroyLocation (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:272:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:184:43
```

Context:

```text
          - listitem [ref=e450]:
            - generic [ref=e451]: About
          - listitem [ref=e452]:
            - generic [ref=e453]: How it works
      - navigation "Help" [ref=e454]:
        - heading "Help" [level=2] [ref=e455]
        - list [ref=e456]:
          - listitem [ref=e457]:
            - generic [ref=e458]: Safety
          - listitem [ref=e459]:
            - generic [ref=e460]: Contact
      - navigation "Legal" [ref=e461]:
        - heading "Legal" [level=2] [ref=e462]
        - list [ref=e463]:
          - listitem [ref=e464]:
            - generic [ref=e465]: Terms
          - listitem [ref=e466]:
            - generic [ref=e467]: Privacy
    - paragraph [ref=e469]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

107 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 5, shard 6 |
| `too many previews` (quiet) | 10 | shard 2, shard 6 |
| `listing not found` | 7 | shard 3, shard 4, shard 7, shard 8 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `categories file too large` (quiet) | 2 | shard 2, shard 6 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 6 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 6 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 5 |
| `countries badHeader` (quiet) | 2 | shard 2, shard 6 |
| `countries nulByte` (quiet) | 2 | shard 2, shard 6 |
| `countries tooManyRows` (quiet) | 2 | shard 2, shard 6 |
| `countries unknownColumn` (quiet) | 2 | shard 2, shard 6 |
| `countries wrongFile` (quiet) | 2 | shard 2, shard 6 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 6 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 6 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 6 |
| `links unknownColumn` (quiet) | 2 | shard 2, shard 6 |
| `locations badHeader` (quiet) | 2 | shard 2, shard 6 |
| `locations file too large` (quiet) | 2 | shard 2, shard 6 |
| `locations nulByte` (quiet) | 2 | shard 2, shard 6 |
| `locations unknownColumn` (quiet) | 2 | shard 2, shard 6 |
| `locations wrongFile` (quiet) | 2 | shard 2, shard 6 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 6 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 6 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 6 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 6 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 6 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 6 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>glje: e<n>e_par_ktobev → e<n>e_chi_z<n>ncz` (quiet) | 1 | shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-g<n>l<n>in: e<n>e_par_<n>zm<n>e<n> → e<n>e_chi_a<n>ru` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>glje: e<n>e_par_ktobev → e<n>e_chi_z<n>ncz ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-g<n>l<n>in: e<n>e_par_<n>zm<n>e<n> → e<n>e_chi_a<n>ru ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 3, shard 4, shard 7, shard 8

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
| smoke | 2026-10-11T10:17:47.849Z | 19.0 min |
| email | 2026-10-11T10:17:52.416Z | 0.4 min |
| shard 1 | 2026-10-11T10:17:36.985Z | 26.4 min |
| shard 2 | 2026-10-11T10:17:37.698Z | 22.7 min |
| shard 3 | 2026-10-11T10:17:46.697Z | 30.7 min |
| shard 4 | 2026-10-11T10:17:37.062Z | 21.3 min |
| shard 5 | 2026-10-11T10:17:35.409Z | 25.9 min |
| shard 6 | 2026-10-11T10:17:55.491Z | 26.1 min |
| shard 7 | 2026-10-11T10:17:50.365Z | 32.1 min |
| shard 8 | 2026-10-11T10:17:50.962Z | 22.9 min |
| changed | 2026-10-11T10:17:38.045Z | 11.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-bundle2.spec.ts` | 66 | 28.3 min | shard 3, shard 7 |
| `shell.spec.ts` | 336 | 23.0 min | smoke, shard 4, shard 8 |
| `admin-screening.spec.ts` | 30 | 19.6 min | shard 2, shard 6 |
| `admin-listings.spec.ts` | 36 | 19.6 min | shard 1, shard 5, changed |
| `post-wizard-where.spec.ts` | 32 | 18.8 min | shard 4, shard 8 |
| `post-wizard-category.spec.ts` | 46 | 17.5 min | shard 3, shard 7 |
| `post-wizard-place.spec.ts` | 38 | 17.4 min | shard 3, shard 7 |
| `post-wizard-pricing.spec.ts` | 50 | 17.2 min | shard 3, shard 7 |
| `posting-routes.spec.ts` | 50 | 14.6 min | shard 4, shard 8 |
| `admin-categories-lifecycle.spec.ts` | 48 | 13.9 min | shard 1, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 12.8 min | shard 1, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 12.2 min | shard 4, shard 8 |
| `post-wizard-specs.spec.ts` | 78 | 11.5 min | shard 3, shard 7 |
| `auth-signout.spec.ts` | 44 | 11.3 min | smoke, shard 2, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 10.8 min | shard 1, shard 5 |
| `feed-screens.spec.ts` | 28 | 10.5 min | shard 2, shard 6 |
| `photo-pipeline.spec.ts` | 20 | 10.5 min | shard 3, shard 7 |
| `admin-attributes-editor.spec.ts` | 34 | 10.4 min | shard 1, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 9.7 min | shard 1, shard 5 |
| `admin-attributes-links.spec.ts` | 30 | 9.7 min | shard 1, shard 5 |
| `viewing-place.spec.ts` | 22 | 9.7 min | shard 4, shard 8 |
| `admin-audit.spec.ts` | 24 | 9.5 min | shard 1, shard 5, changed |
| `feed-index.spec.ts` | 28 | 9.4 min | shard 2, shard 6 |
| `admin-users.spec.ts` | 26 | 9.0 min | shard 2, shard 6 |
| `admin-translations-console.spec.ts` | 40 | 8.6 min | shard 2, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 6.4 min | shard 3, shard 7 |
| `admin-roles.spec.ts` | 26 | 6.4 min | shard 1, shard 6 |
| `admin-locations.spec.ts` | 38 | 6.3 min | shard 1, shard 5 |
| `admin-attributes-safety.spec.ts` | 14 | 5.9 min | shard 1, shard 5 |
| `import-security.spec.ts` | 34 | 5.9 min | shard 2, shard 6 |
| `feed-route.spec.ts` | 16 | 5.8 min | shard 2, shard 6 |
| `posting-routes-dials.spec.ts` | 14 | 4.9 min | shard 4, shard 8 |
| `admin-countries.spec.ts` | 18 | 3.9 min | shard 1, shard 5 |
| `admin-shell.spec.ts` | 10 | 3.7 min | shard 2, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 3.2 min | shard 2, shard 6 |
| `admin-categories-home.spec.ts` | 8 | 3.1 min | shard 1, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 3.0 min | shard 3, shard 7 |
| `post-wizard-finder.spec.ts` | 8 | 2.6 min | shard 3, shard 7 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 2.0 min | shard 4, shard 8 |
| `admin-coverage.spec.ts` | 14 | 1.8 min | shard 1, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 4, shard 8 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 1.3 min | shard 3, shard 7 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 3, shard 7 |
| `smoke-auth-i18n.spec.ts` | 4 | 1.0 min | smoke, shard 4, shard 8 |
| `rbac.spec.ts` | 6 | 1.0 min | shard 4, shard 8 |
| `a11y.spec.ts` | 4 | 0.9 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 6 |
| `settings.spec.ts` | 4 | 0.7 min | shard 4 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 0.5 min | shard 3, shard 7 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 4, shard 8 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 4, shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 6 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-listings.spec.ts` › AL-3 Edit refuses: no permission, a reviewer, no second factor, the admin's own, a draft, a removed listing | mobile-360 | 133.6 s |
| `admin-listings.spec.ts` › AL-3 Edit refuses: no permission, a reviewer, no second factor, the admin's own, a draft, a removed listing | desktop-1280 | 127.5 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 81.2 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 71.9 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | desktop-1280 | 70.4 s |
| `admin-screening.spec.ts` › SC-8 a person who is not a reviewer reads nothing; a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) | desktop-1280 | 65.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 65.5 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 65.0 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | mobile-360 | 64.9 s |
| `admin-screening.spec.ts` › SC-8 a person who is not a reviewer reads nothing; a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) | mobile-360 | 61.9 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | desktop-1280 | 61.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 60.8 s |
| `admin-categories-console.spec.ts` › CT-7 step-up: the server refuses the write until AAL2 is proven | desktop-1280 | 60.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 60.6 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | mobile-360 | 59.8 s |
