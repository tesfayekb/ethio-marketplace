# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38626272771 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38626272771
- Commit: `3ebf2a2e54164eba14c665b0ec61df4c0ed1e1be`
- Attempt: 2
- Written (UTC): 2026-10-14T20:56:52.649Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 2
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-144 leaving the contact step makes one identity call, or none when nothing changed — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-8 Restore: not by the owner, not without a second factor; a severe removal by a super admin only — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-144 leaving the contact step makes one identity call, or none when nothing changed

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')


  1599 |       const mark = calls.length;
  1600 |       await page.getByTestId("post-next").click();
> 1601 |       await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
       |                                                     ^
  1602 |       expect(calls.length - mark, `PW-144: pass ${pass} with nothing changed called identity`).toBe(
  1603 |         0,
  1604 |       );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1601:53
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-144-leaving-the-contact-step-makes-one-identity-call-or-none-when-nothing-changed-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-a2e7f-r-none-when-nothing-changed-mobile-360`; this run carried 1 context file(s); of the same spec: none

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-8 Restore: not by the owner, not without a second factor; a severe removal by a super admin only

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

Matcher error: received value must be a non-null object

Received has value: null

  727 |
  728 |     await useJobSuperAdmin(page);
> 729 |     expect((await restore(severe.id)).data).toMatchObject({ ok: true, status: "screening" });
      |                                             ^
  730 |     expect((await listingTruth(severe.id))?.["status"]).toBe("screening");
  731 |     expect((await listingTruth(plainRemoved.id))?.["status"]).toBe("removed");
  732 |     expect(await auditRows(plainRemoved.id)).toEqual([]);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:729:45
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_move_listing ({"code":"P0001","details":null,"hint":null,"message":"listing not found"})
```

Context:

```text
          - listitem [ref=e280]:
            - generic [ref=e281]: About
          - listitem [ref=e282]:
            - generic [ref=e283]: How it works
      - navigation "Help" [ref=e284]:
        - heading "Help" [level=2] [ref=e285]
        - list [ref=e286]:
          - listitem [ref=e287]:
            - generic [ref=e288]: Safety
          - listitem [ref=e289]:
            - generic [ref=e290]: Contact
      - navigation "Legal" [ref=e291]:
        - heading "Legal" [level=2] [ref=e292]
        - list [ref=e293]:
          - listitem [ref=e294]:
            - generic [ref=e295]: Terms
          - listitem [ref=e296]:
            - generic [ref=e297]: Privacy
    - paragraph [ref=e299]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-hay<n>pk: e<n>e_par_iwb<n>k<n> → e<n>e_chi_tb<n>wh<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ljludg: e<n>e_par_eqf<n>a → e<n>e_chi_dhwdse` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-hay<n>pk: e<n>e_par_iwb<n>k<n> → e<n>e_chi_tb<n>wh<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ljludg: e<n>e_par_eqf<n>a → e<n>e_chi_dhwdse ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 2, shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-27 edit_listing counts against the revise dial ×1 · PR-28 transition_listing counts against the revise dial ×1 · PR-42 the door reads a padded answer as the value it stores ×1 · PW-1 the shell renders one step of eight, Back and Next both closed ×1 · PW-104 a unit settled by the type is held by the price page's unit ×1

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
| smoke | 2026-10-14T20:18:20.897Z | 15.2 min |
| email | 2026-10-14T20:18:17.348Z | 0.2 min |
| shard 1 | 2026-10-14T20:18:26.235Z | 37.7 min |
| shard 2 | 2026-10-14T20:18:17.771Z | 35.0 min |
| shard 3 | 2026-10-14T20:18:20.420Z | 32.6 min |
| shard 4 | 2026-10-14T20:18:41.724Z | 37.7 min |
| shard 5 | 2026-10-14T20:18:25.495Z | 36.0 min |
| shard 6 | 2026-10-14T20:18:21.068Z | 32.1 min |
| changed | 2026-10-14T20:18:18.944Z | 7.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 80 | 26.9 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 62 | 26.4 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 58 | 22.9 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 22.6 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 20.6 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 19.7 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 40 | 18.1 min | shard 2, shard 5, changed |
| `admin-categories-lifecycle.spec.ts` | 50 | 15.4 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 14.6 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 52 | 12.1 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 12.1 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 11.8 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 44 | 11.4 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 10.5 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 10.4 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 10.1 min | smoke, shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 10.0 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.7 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 9.4 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 9.3 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 9.3 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 28 | 8.9 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 26 | 8.8 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 8.1 min | shard 3, shard 6 |
| `posting-routes-dials.spec.ts` | 36 | 7.8 min | shard 3, shard 6, changed |
| `feed-index.spec.ts` | 28 | 6.5 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.5 min | shard 3, shard 6 |
| `import-security.spec.ts` | 36 | 6.4 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.4 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 16 | 6.1 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 6.0 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.4 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.2 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 4.1 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.6 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.9 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.6 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.1 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.9 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.8 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-listings.spec.ts` › AL-8 Restore: not by the owner, not without a second factor; a severe removal by a super admin only | desktop-1280 | 99.5 s |
| `post-wizard-bundle2.spec.ts` › PW-144 leaving the contact step makes one identity call, or none when nothing changed | mobile-360 | 77.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 68.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 64.6 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 62.8 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | mobile-360 | 60.0 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 58.9 s |
| `post-wizard-bundle2.spec.ts` › PW-118 a draft's own channel is never overwritten by the last post's | desktop-1280 | 54.2 s |
| `admin-listings.spec.ts` › AL-10 All listings page: the blocks, the views, the seller filter, newest first, drafts never | mobile-360 | 54.1 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 53.6 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | desktop-1280 | 51.8 s |
| `shell.spec.ts` › TR-37 the account carries onto a starless device, and never over a star | desktop-1280 | 51.6 s |
| `posting-routes-catalog.spec.ts` › PR-42 the door reads a padded answer as the value it stores | mobile-360 | 50.1 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 49.0 s |
| `photo-pipeline.spec.ts` › PP-13 photo links: the owner and staff get them; another seller and no session do not | desktop-1280 | 48.5 s |
