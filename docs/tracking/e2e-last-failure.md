# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38261739605
- Commit: `7d44c1502eebc21b319d86e5c1c87b6328277cc3`
- Attempt: 1
- Written (UTC): 2026-10-12T14:48:06.248Z
- Passed: 1697 · Skipped: 174 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 5
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes-links.spec.ts › C3 attributes console › AT-59 the link editor's Save reflects change, saved and error — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-console.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home — Error: [e2e:reap] category of e2e-cat-1-1-a4kffo failed: <html>
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-home.spec.ts › Bundle 7 category doors › CT-41 the admin's own client cannot write the eight door tables; the doors still can — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-images.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-console.spec.ts › C2 categories console › CT-7 step-up: the server refuses the write until AAL2 is proven — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-attributes-links.spec.ts › C3 attributes console › AT-59 the link editor's Save reflects change, saved and error

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-0-m4lpdk-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-0-m4lpdk-card')

[dialog-dump findRow(e2e-cat-1-0-m4lpdk)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-1-0-m4lpdk) after create] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-0-m4lpdk-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-0-m4lpdk-card')

[dialog-dump findRow(e2e-cat-1-0-m4lpdk)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-1-0-m4lpdk) after create] open dialogs: none

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

### admin-categories-console.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:reap] category of e2e-cat-1-1-a4kffo failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>

--- further error 1 ---
Error: [e2e:reap] category of e2e-cat-1-1-a4kffo failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>


   at helpers/categories.ts:306

  304 |   // INC-383 — every step checks its error; a failed reap is loud.
  305 |   const fail = (step: string, error: { message: string } | null) => {
> 306 |     if (error) throw new Error(`[e2e:reap] ${step} of ${slug} failed: ${error.message}`);
      |                      ^
  307 |   };
  308 |   const pointers = await supabase
  309 |     .from("category_tree_pointers")
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/categories.ts:306:22)
    at destroyCategory (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/categories.ts:325:3)
```

Context:

```text
        - generic [ref=e42]: Listing lifetime (days)
        - textbox "Listing lifetime (days)" [ref=e43]:
          - /placeholder: No end
      - generic [ref=e44]:
        - checkbox "Accepts listings" [checked] [ref=e45] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e46]:
        - checkbox "Price field enabled" [checked] [ref=e47] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e48]:
        - button "Cancel" [ref=e49] [cursor=pointer]
        - button "Save" [ref=e50] [cursor=pointer]
    - button "Close" [ref=e51] [cursor=pointer]:
      - img [ref=e52]
      - generic [ref=e55]: Close
```
```

### admin-categories-home.spec.ts › Bundle 7 category doors › CT-41 the admin's own client cannot write the eight door tables; the doors still can

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-2-2fason-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-2-2fason-card')

[dialog-dump findRow(e2e-cat-1-2-2fason)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-1-2-2fason) after create] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-2-2fason-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-2-2fason-card')

[dialog-dump findRow(e2e-cat-1-2-2fason)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-1-2-2fason) after create] open dialogs: none

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

### admin-categories-images.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-4-cf24n7-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-4-cf24n7-card')

[dialog-dump findRow(e2e-cat-1-4-cf24n7)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-1-4-cf24n7) after create] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-4-cf24n7-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-4-cf24n7-card')

[dialog-dump findRow(e2e-cat-1-4-cf24n7)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-1-4-cf24n7) after create] open dialogs: none

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

### admin-categories-console.spec.ts › C2 categories console › CT-7 step-up: the server refuses the write until AAL2 is proven

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-0-yx7r68')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-0-yx7r68')

[dialog-dump findRow(e2e-cat-4-0-yx7r68)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-4-0-yx7r68) after create] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-0-yx7r68')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-0-yx7r68')

[dialog-dump findRow(e2e-cat-4-0-yx7r68)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-4-0-yx7r68) after create] open dialogs: none

   at helpers/categories.ts:354

  352 |     await findRow(page, slug);
  353 |   } catch (error) {
> 354 |     throw new Error(`${error instanceof Error ? error.message : String(error)}\n${afterCreate}`);
      |           ^
```

Context:

```text
          - listitem [ref=e291]:
            - generic [ref=e292]: About
          - listitem [ref=e293]:
            - generic [ref=e294]: How it works
      - navigation "Help" [ref=e295]:
        - heading "Help" [level=2] [ref=e296]
        - list [ref=e297]:
          - listitem [ref=e298]:
            - generic [ref=e299]: Safety
          - listitem [ref=e300]:
            - generic [ref=e301]: Contact
      - navigation "Legal" [ref=e302]:
        - heading "Legal" [level=2] [ref=e303]
        - list [ref=e304]:
          - listitem [ref=e305]:
            - generic [ref=e306]: Terms
          - listitem [ref=e307]:
            - generic [ref=e308]: Privacy
    - paragraph [ref=e310]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

107 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 7 | shard 3, shard 5, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>x<n>s<n>: e<n>e_par_pfktvf → e<n>e_chi_<n>jpnya` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-j<n>c<n>x<n>: e<n>e_par_aip<n>kj → e<n>e_chi_<n>r<n>gwh` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>x<n>s<n>: e<n>e_par_pfktvf → e<n>e_chi_<n>jpnya ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-j<n>c<n>x<n>: e<n>e_par_aip<n>kj → e<n>e_chi_<n>r<n>gwh ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 3, shard 5, shard 6

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
| smoke | 2026-10-12T14:18:00.056Z | 14.6 min |
| email | 2026-10-12T14:17:56.537Z | 0.2 min |
| shard 1 | 2026-10-12T14:17:59.030Z | 29.8 min |
| shard 2 | 2026-10-12T14:18:08.715Z | 28.8 min |
| shard 3 | 2026-10-12T14:18:20.794Z | 26.5 min |
| shard 4 | 2026-10-12T14:18:02.492Z | 29.8 min |
| shard 5 | 2026-10-12T14:18:00.705Z | 25.4 min |
| shard 6 | 2026-10-12T14:17:58.628Z | 23.1 min |
| changed | 2026-10-12T14:17:59.890Z | 5.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 504 | 29.3 min | smoke, shard 3, shard 6, changed |
| `post-wizard-specs.spec.ts` | 78 | 23.3 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 19.0 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 54 | 14.6 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 50 | 13.0 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 12.7 min | shard 3, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 12.2 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 46 | 12.0 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 11.8 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 10.4 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 9.8 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.7 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 52 | 9.5 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 32 | 9.2 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 8.8 min | smoke, shard 2, shard 5 |
| `admin-users.spec.ts` | 26 | 7.9 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 7.9 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 28 | 7.6 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.0 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 34 | 6.8 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 6.7 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.5 min | shard 3, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.0 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 42 | 5.8 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.5 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.0 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 4.9 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 14 | 4.8 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 4.4 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 3.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.4 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 5 |
| `admin-categories-home.spec.ts` | 8 | 3.0 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 16 | 2.6 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 2.4 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.2 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.8 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.4 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 1.2 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.8 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-attributes-library.spec.ts` › AT-6 merge: links move to the survivor and the sources disappear | desktop-1280 | 67.7 s |
| `admin-attributes-links.spec.ts` › AT-59 the link editor's Save reflects change, saved and error | mobile-360 | 57.4 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 55.4 s |
| `admin-categories-console.spec.ts` › CT-7 step-up: the server refuses the write until AAL2 is proven | desktop-1280 | 53.7 s |
| `admin-categories-console.spec.ts` › CT-6 retirement: a retired category leaves the active tree and keeps its listings home | mobile-360 | 52.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 51.7 s |
| `admin-categories-home.spec.ts` › CT-41 the admin's own client cannot write the eight door tables; the doors still can | mobile-360 | 48.9 s |
| `admin-categories-images.spec.ts` › CI-4 image tab: generate persists three assets and regenerate re-versions them | mobile-360 | 48.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 47.6 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 43.7 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 42.7 s |
| `posting-routes-catalog.spec.ts` › PR-41 the door refuses an answer the chosen options do not allow | mobile-360 | 42.1 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 41.8 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 38.8 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 37.8 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38261739605-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38261739605-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38261739605-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 38261739605-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38261739605-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38261739605-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 38261739605-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38261739605-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38261739605-changed
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-6 merge: links move to the survivor and the sources disappear

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-1-qyfr5a')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-1-qyfr5a')

[dialog-dump findRow(e2e-cat-4-1-qyfr5a)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-4-1-qyfr5a) after create] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-1-qyfr5a')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-1-qyfr5a')

[dialog-dump findRow(e2e-cat-4-1-qyfr5a)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-4-1-qyfr5a) after create] open dialogs: none

   at helpers/categories.ts:354

  352 |     await findRow(page, slug);
  353 |   } catch (error) {
> 354 |     throw new Error(`${error instanceof Error ? error.message : String(error)}\n${afterCreate}`);
      |           ^
```

Context:

```text
          - listitem [ref=e291]:
            - generic [ref=e292]: About
          - listitem [ref=e293]:
            - generic [ref=e294]: How it works
      - navigation "Help" [ref=e295]:
        - heading "Help" [level=2] [ref=e296]
        - list [ref=e297]:
          - listitem [ref=e298]:
            - generic [ref=e299]: Safety
          - listitem [ref=e300]:
            - generic [ref=e301]: Contact
      - navigation "Legal" [ref=e302]:
        - heading "Legal" [level=2] [ref=e303]
        - list [ref=e304]:
          - listitem [ref=e305]:
            - generic [ref=e306]: Terms
          - listitem [ref=e307]:
            - generic [ref=e308]: Privacy
    - paragraph [ref=e310]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-j3c3x6: e2e_par_aip7kj → e2e_chi_1r6gwh
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).
