# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38195005620
- Commit: `6148f2ef854d7a94a2b94f82bab255b6a8ed4092`
- Attempt: 1
- Written (UTC): 2026-10-12T02:47:18.004Z
- Passed: 1611 · Skipped: 125 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 7
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-console.spec.ts › C2 categories console › CT-7 step-up: the server refuses the write until AAL2 is proven — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-178 a late read of the place text never replaces a newer save — Error: PW-178: the held answer was not the older text
- FLAKY (passed on retry) · `mobile-360` · source `shard 4` · viewing-place.spec.ts › VIEWING PLACE — the shell carries it (D106 part 2) › VP-9 the account's newer pick wins over this browser's older one — Error: the ET tree never carried e2e-loc-4-1-ls-sub-9jp05a within 20 s
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-editor.spec.ts › C3 attributes console › AT-34 a categories:view-only operator cannot set a dependency — Error: [e2e:pool] reaping e2e-pool-s4a-000@ethio-e2e.invalid (factors) failed: {}
- FLAKY (passed on retry) · `desktop-1280` · source `shard 8` · shell.spec.ts › L4b location picker › LS-9 coordinates far from every metro stop at the market — Error: the ET tree never carried e2e-loc-8-0-gs-city-oa0c2o within 20 s
- FLAKY (passed on retry) · `desktop-1280` · source `shard 8` · viewing-place.spec.ts › VIEWING PLACE — the account doors (D106) › VP-2 a place that is not shown is refused, and the saved place stays — Error: {"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"}
- FLAKY (passed on retry) · `mobile-360` · source `changed` · admin-translations-console.spec.ts › U4b translations console › TR-7b sync after a step-up prompt still reports its counts — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-categories-console.spec.ts › C2 categories console › CT-7 step-up: the server refuses the write until AAL2 is proven

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-up7mn4-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-up7mn4-card')

[dialog-dump findRow(e2e-cat-1-1-up7mn4)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-1-1-up7mn4) after create] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-up7mn4-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-up7mn4-card')

[dialog-dump findRow(e2e-cat-1-1-up7mn4)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-1-1-up7mn4) after create] open dialogs: none

   at helpers/categories.ts:354

  352 |     await findRow(page, slug);
  353 |   } catch (error) {
> 354 |     throw new Error(`${error instanceof Error ? error.message : String(error)}\n${afterCreate}`);
      |           ^
```

Context:

```text
          - listitem [ref=e267]:
            - generic [ref=e268]: About
          - listitem [ref=e269]:
            - generic [ref=e270]: How it works
      - navigation "Help" [ref=e271]:
        - heading "Help" [level=2] [ref=e272]
        - list [ref=e273]:
          - listitem [ref=e274]:
            - generic [ref=e275]: Safety
          - listitem [ref=e276]:
            - generic [ref=e277]: Contact
      - navigation "Legal" [ref=e278]:
        - heading "Legal" [level=2] [ref=e279]
        - list [ref=e280]:
          - listitem [ref=e281]:
            - generic [ref=e282]: Terms
          - listitem [ref=e283]:
            - generic [ref=e284]: Privacy
    - paragraph [ref=e286]: © 2026 ethio.com — All rights reserved.
```
```

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

### viewing-place.spec.ts › VIEWING PLACE — the shell carries it (D106 part 2) › VP-9 the account's newer pick wins over this browser's older one

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: the ET tree never carried e2e-loc-4-1-ls-sub-9jp05a within 20 s

expect(received).toContain(expected) // indexOf

Expected value: "e2e-loc-4-1-ls-sub-9jp05a"
Received array: ["ethiopia", "addis-ababa", "amhara", "dire-dawa", "e2e-loc-4-1-ls-region-92fs8o", "e2e-loc-5-0-ls-region-y5frtv", "e2e-loc-8-0-gs-region-fglxvh", "e2e-loc-8-1-ls-region-w1nkfw", "e2e-loc-changed-3-ls-region-rb79u5", "oromia", …]

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: the ET tree never carried e2e-loc-4-1-ls-sub-9jp05a within 20 s

expect(received).toContain(expected) // indexOf

Expected value: "e2e-loc-4-1-ls-sub-9jp05a"
Received array: ["ethiopia", "addis-ababa", "amhara", "dire-dawa", "e2e-loc-4-1-ls-region-92fs8o", "e2e-loc-5-0-ls-region-y5frtv", "e2e-loc-8-0-gs-region-fglxvh", "e2e-loc-8-1-ls-region-w1nkfw", "e2e-loc-changed-3-ls-region-rb79u5", "oromia", …]

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

   at helpers/locations.ts:482

  480 | export async function waitForTreeSlug(page: Page, countryCode: string, slug: string) {
  481 |   let seen: string[] = [];
> 482 |   await expect
      |   ^
  483 |     .poll(
  484 |       async () => {
  485 |         seen = await treeSlugs(page, countryCode);
    at waitForTreeSlug (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:482:3)
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-shell-carries-it-D106-part-2-VP-9-the-account-s-newer-pick-wins-over-this-browser-s-older-one-mobile-360`

### admin-attributes-editor.spec.ts › C3 attributes console › AT-34 a categories:view-only operator cannot set a dependency

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s4a-000@ethio-e2e.invalid (factors) failed: {}
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s4a-000@ethio-e2e.invalid (factors) failed: {}

   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:355:22)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-editor.spec.ts:398:22
```

Context: context file not found for `admin-attributes-editor-C3-attributes-console-AT-34-a-categories-view-only-operator-cannot-set-a-dependency-desktop-1280`

### shell.spec.ts › L4b location picker › LS-9 coordinates far from every metro stop at the market

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: the ET tree never carried e2e-loc-8-0-gs-city-oa0c2o within 20 s

expect(received).toContain(expected) // indexOf

Expected value: "e2e-loc-8-0-gs-city-oa0c2o"
Received array: ["ethiopia", "addis-ababa", "amhara", "dire-dawa", "e2e-loc-4-1-ls-region-92fs8o", "e2e-loc-5-0-ls-region-y5frtv", "e2e-loc-8-0-gs-region-1abdwv", "e2e-loc-changed-3-ls-region-rb79u5", "oromia", "sidama", …]

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: the ET tree never carried e2e-loc-8-0-gs-city-oa0c2o within 20 s

expect(received).toContain(expected) // indexOf

Expected value: "e2e-loc-8-0-gs-city-oa0c2o"
Received array: ["ethiopia", "addis-ababa", "amhara", "dire-dawa", "e2e-loc-4-1-ls-region-92fs8o", "e2e-loc-5-0-ls-region-y5frtv", "e2e-loc-8-0-gs-region-1abdwv", "e2e-loc-changed-3-ls-region-rb79u5", "oromia", "sidama", …]

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

   at helpers/locations.ts:482

  480 | export async function waitForTreeSlug(page: Page, countryCode: string, slug: string) {
  481 |   let seen: string[] = [];
> 482 |   await expect
      |   ^
  483 |     .poll(
  484 |       async () => {
  485 |         seen = await treeSlugs(page, countryCode);
    at waitForTreeSlug (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:482:3)
```

Context: context file not found for `shell-L4b-location-picker-LS-9-coordinates-far-from-every-metro-stop-at-the-market-desktop-1280`

### viewing-place.spec.ts › VIEWING PLACE — the account doors (D106) › VP-2 a place that is not shown is refused, and the saved place stays

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: {"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"}

expect(received).toBeNull()

Received: {"code": "57014", "details": null, "hint": null, "message": "canceling statement due to statement timeout"}
--- further error 1 ---
Error: {"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"}

expect(received).toBeNull()

Received: {"code": "57014", "details": null, "hint": null, "message": "canceling statement due to statement timeout"}

  84 |   async function setPlace(own: SupabaseClient, id: string | null): Promise<Answer> {
  85 |     const { data, error } = await own.rpc("user_set_viewing_location", { p_location: id });
> 86 |     expect(error, JSON.stringify(error)).toBeNull();
     |                                          ^
  87 |     return data as Answer;
  88 |   }
  89 |
    at setPlace (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:86:42)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:136:14
```

Context:

```text
          - listitem [ref=e255]:
            - generic [ref=e256]: About
          - listitem [ref=e257]:
            - generic [ref=e258]: How it works
      - navigation "Help" [ref=e259]:
        - heading "Help" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Safety
          - listitem [ref=e264]:
            - generic [ref=e265]: Contact
      - navigation "Legal" [ref=e266]:
        - heading "Legal" [level=2] [ref=e267]
        - list [ref=e268]:
          - listitem [ref=e269]:
            - generic [ref=e270]: Terms
          - listitem [ref=e271]:
            - generic [ref=e272]: Privacy
    - paragraph [ref=e274]: © 2026 ethio.com — All rights reserved.
```
```

### admin-translations-console.spec.ts › U4b translations console › TR-7b sync after a step-up prompt still reports its counts

- Source: `changed`
- Project: `mobile-360`

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
user 801f2b49-1cb9-4edb-a9fc-3133b1dc2ef9
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
user 801f2b49-1cb9-4edb-a9fc-3133b1dc2ef9

  100 |     await assertion();
  101 |   } catch (error) {
> 102 |     throw new Error(
      |           ^
  103 |       `${error instanceof Error ? error.message : String(error)}\n[e2e:l4c] ${await evidence()}`,
  104 |     );
```

Context:

```text
          - listitem [ref=e1091]:
            - generic [ref=e1092]: About
          - listitem [ref=e1093]:
            - generic [ref=e1094]: How it works
      - navigation "Help" [ref=e1095]:
        - heading "Help" [level=2] [ref=e1096]
        - list [ref=e1097]:
          - listitem [ref=e1098]:
            - generic [ref=e1099]: Safety
          - listitem [ref=e1100]:
            - generic [ref=e1101]: Contact
      - navigation "Legal" [ref=e1102]:
        - heading "Legal" [level=2] [ref=e1103]
        - list [ref=e1104]:
          - listitem [ref=e1105]:
            - generic [ref=e1106]: Terms
          - listitem [ref=e1107]:
            - generic [ref=e1108]: Privacy
    - paragraph [ref=e1110]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

109 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 5, shard 7 |
| `too many previews` (quiet) | 10 | shard 3, shard 7 |
| `listing not found` | 9 | shard 3, shard 4, shard 7, shard 8 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>csbnm: e<n>e_par_en<n>de → e<n>e_chi_o<n>ltdt` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>g<n>: e<n>e_par_rmckm<n> → e<n>e_chi_<n>hgavp` (quiet) | 1 | shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>csbnm: e<n>e_par_en<n>de → e<n>e_chi_o<n>ltdt ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>g<n>: e<n>e_par_rmckm<n> → e<n>e_chi_<n>hgavp ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 4, shard 7, shard 8

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
| smoke | 2026-10-12T02:15:57.695Z | 20.2 min |
| email | 2026-10-12T02:15:43.351Z | 0.2 min |
| shard 1 | 2026-10-12T02:15:54.755Z | 24.2 min |
| shard 2 | 2026-10-12T02:15:42.065Z | 26.2 min |
| shard 3 | 2026-10-12T02:15:40.983Z | 26.6 min |
| shard 4 | 2026-10-12T02:15:56.823Z | 30.3 min |
| shard 5 | 2026-10-12T02:15:45.808Z | 26.6 min |
| shard 6 | 2026-10-12T02:15:41.041Z | 21.1 min |
| shard 7 | 2026-10-12T02:15:40.375Z | 26.7 min |
| shard 8 | 2026-10-12T02:16:11.288Z | 30.7 min |
| changed | 2026-10-12T02:15:51.272Z | 7.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 33.2 min | shard 4, shard 8 |
| `admin-listings.spec.ts` | 50 | 22.8 min | shard 2, shard 5 |
| `post-wizard-bundle2.spec.ts` | 66 | 22.7 min | shard 3, shard 7 |
| `shell.spec.ts` | 336 | 21.8 min | smoke, shard 4, shard 8 |
| `admin-translations-console.spec.ts` | 84 | 18.8 min | shard 2, shard 6, changed |
| `post-wizard-resets.spec.ts` | 34 | 17.8 min | shard 4, shard 8 |
| `admin-categories-lifecycle.spec.ts` | 50 | 15.8 min | shard 1, shard 5 |
| `admin-screening.spec.ts` | 30 | 15.2 min | shard 2, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 14.9 min | shard 4, shard 8 |
| `post-wizard-category.spec.ts` | 46 | 14.9 min | shard 3, shard 7 |
| `feed-screens.spec.ts` | 28 | 13.6 min | shard 3, shard 7 |
| `post-wizard-place.spec.ts` | 38 | 13.6 min | shard 3, shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 13.3 min | shard 1, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 13.0 min | shard 3, shard 7 |
| `admin-categories-console.spec.ts` | 34 | 11.7 min | shard 1, shard 5 |
| `auth-signout.spec.ts` | 44 | 10.9 min | smoke, shard 2, shard 6 |
| `admin-attributes-links.spec.ts` | 32 | 10.2 min | shard 1, shard 5 |
| `admin-locations.spec.ts` | 38 | 9.5 min | shard 2, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 9.5 min | shard 1, shard 5 |
| `posting-routes.spec.ts` | 50 | 9.4 min | shard 4, shard 8 |
| `posting-routes-catalog.spec.ts` | 18 | 9.0 min | shard 4, shard 8 |
| `admin-attributes-editor.spec.ts` | 34 | 8.4 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 8.4 min | shard 2, shard 6 |
| `feed-index.spec.ts` | 28 | 7.5 min | shard 2, shard 6 |
| `viewing-place.spec.ts` | 22 | 7.3 min | shard 4, shard 8 |
| `admin-roles.spec.ts` | 26 | 6.9 min | shard 2, shard 6 |
| `photo-pipeline.spec.ts` | 20 | 6.9 min | shard 3, shard 7 |
| `import-security.spec.ts` | 34 | 6.8 min | shard 3, shard 7 |
| `admin-translations-governance.spec.ts` | 16 | 6.2 min | shard 2, shard 6, changed |
| `admin-attributes-safety.spec.ts` | 14 | 5.7 min | shard 1, shard 5 |
| `feed-route.spec.ts` | 16 | 4.6 min | shard 2, shard 6 |
| `admin-audit.spec.ts` | 12 | 4.5 min | shard 1, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 4.5 min | shard 4, shard 8 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 5 |
| `admin-shell.spec.ts` | 10 | 3.4 min | shard 2, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 3.3 min | shard 4, shard 8 |
| `admin-categories-home.spec.ts` | 8 | 3.3 min | shard 1, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 3.2 min | shard 3, shard 7 |
| `admin-translations-data.spec.ts` | 8 | 2.9 min | shard 2, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.9 min | shard 3, shard 7 |
| `post-wizard-finder.spec.ts` | 8 | 2.8 min | shard 3, shard 7 |
| `admin-coverage.spec.ts` | 14 | 2.0 min | shard 1, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.6 min | shard 4, shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 1.5 min | shard 4, shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 1.3 min | shard 4, shard 8 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 3, shard 7 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 3, shard 7 |
| `i18n-coverage.spec.ts` | 8 | 0.9 min | shard 3, shard 7 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 4, shard 8 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 5 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 3, shard 7 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 4, shard 8 |
| `settings.spec.ts` | 4 | 0.6 min | shard 4 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 4, shard 8 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 3, shard 7 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 4, shard 8 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 86.7 s |
| `viewing-place.spec.ts` › VP-2 a place that is not shown is refused, and the saved place stays | desktop-1280 | 71.1 s |
| `admin-categories-console.spec.ts` › CT-7 step-up: the server refuses the write until AAL2 is proven | mobile-360 | 70.4 s |
| `admin-translations-console.spec.ts` › TR-7b sync after a step-up prompt still reports its counts | mobile-360 | 66.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 65.7 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | desktop-1280 | 64.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 64.1 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 63.4 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 62.3 s |
| `admin-attributes-editor.spec.ts` › AT-34 a categories:view-only operator cannot set a dependency | desktop-1280 | 57.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 55.1 s |
| `shell.spec.ts` › LS-9 coordinates far from every metro stop at the market | desktop-1280 | 54.6 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 54.3 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 53.4 s |
| `admin-attributes-editor.spec.ts` › AT-58 a rank swap within one category imports through the route | mobile-360 | 53.1 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38195005620-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38195005620-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 38195005620-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 17 (pool 5, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 21 user(s) owned by process 38195005620-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 38195005620-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38195005620-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 5, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 38195005620-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 5, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 38195005620-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 38195005620-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38195005620-8
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 38195005620-changed
```

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the mobile drawer renders no English fallback

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: mobile drawer categories: category labels still in English

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "e2e-post-4-0-9zwipg => \"ipg\"",
+ ]
--- further error 1 ---
Error: mobile drawer categories: category labels still in English

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "e2e-post-4-0-9zwipg => \"ipg\"",
+ ]

  181 |     english.map((row) => `${row.slug} => "${row.label}"`),
  182 |     `${where}: category labels still in English`,
> 183 |   ).toEqual([]);
      |     ^
  184 | }
  185 |
  186 | test.describe("i18n chrome coverage (Amharic)", () => {
    at assertAmharicCategories (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/i18n-coverage.spec.ts:183:5)
```

Context:

```text
          - listitem [ref=e397]:
            - generic [ref=e398]: ስለ እኛ
          - listitem [ref=e399]:
            - generic [ref=e400]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e401]:
        - heading "እገዛ" [level=2] [ref=e402]
        - list [ref=e403]:
          - listitem [ref=e404]:
            - generic [ref=e405]: ደህንነት
          - listitem [ref=e406]:
            - generic [ref=e407]: ያግኙን
      - navigation "ሕጋዊ" [ref=e408]:
        - heading "ሕጋዊ" [level=2] [ref=e409]
        - list [ref=e410]:
          - listitem [ref=e411]:
            - generic [ref=e412]: ውሎች
          - listitem [ref=e413]:
            - generic [ref=e414]: ግላዊነት
    - paragraph [ref=e416]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## Server errors: shard 3

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
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
