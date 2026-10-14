# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38497146343 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38497146343
- Commit: `ce2770e518fbfa28be371e82ee3897e0f1881d9c`
- Attempt: 1
- Written (UTC): 2026-10-14T02:17:39.000Z
- Post-test warnings: 24
- Flaky (passed on retry, DEC-030, non-gating): 4
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes-library.spec.ts › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-screening.spec.ts › ADMIN SCREENING › SC-16 a reviewer without a fresh second factor cannot decide — Error: [e2e:pool] reaping e2e-pool-s1a-000@ethio-e2e.invalid (password) failed: {}
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › mobile chrome › the menu opens in place — Error: expect(received).toBeLessThanOrEqual(expected)
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-translations-console.spec.ts › U4b translations console › TR-40 sync follows a changed Amharic text no person wrote, and keeps one a person wrote — Error: expect(received).toBeNull()

## Flaky bodies (DEC-078)

### admin-attributes-library.spec.ts › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-t40br7-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-t40br7-card')

[dialog-dump findRow(e2e-cat-1-1-t40br7)] open dialogs: none
[roster-dump e2e-cat-1-1-t40br7] page: reading=0 roster=157 shown=0 · db: row active=true pointers=1 · since create: 20.8 s
[dialog-dump createViaUi(e2e-cat-1-1-t40br7) after create] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-t40br7-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-t40br7-card')

[dialog-dump findRow(e2e-cat-1-1-t40br7)] open dialogs: none
[roster-dump e2e-cat-1-1-t40br7] page: reading=0 roster=157 shown=0 · db: row active=true pointers=1 · since create: 20.8 s
[dialog-dump createViaUi(e2e-cat-1-1-t40br7) after create] open dialogs: none

   at helpers/categories.ts:401

  399 |     await findRow(page, slug, createdAt);
  400 |   } catch (error) {
> 401 |     throw new Error(`${error instanceof Error ? error.message : String(error)}\n${afterCreate}`);
```

Context:

```text
          - listitem [ref=e281]:
            - generic [ref=e282]: About
          - listitem [ref=e283]:
            - generic [ref=e284]: How it works
      - navigation "Help" [ref=e285]:
        - heading "Help" [level=2] [ref=e286]
        - list [ref=e287]:
          - listitem [ref=e288]:
            - generic [ref=e289]: Safety
          - listitem [ref=e290]:
            - generic [ref=e291]: Contact
      - navigation "Legal" [ref=e292]:
        - heading "Legal" [level=2] [ref=e293]
        - list [ref=e294]:
          - listitem [ref=e295]:
            - generic [ref=e296]: Terms
          - listitem [ref=e297]:
            - generic [ref=e298]: Privacy
    - paragraph [ref=e300]: © 2026 ethio.com — All rights reserved.
```
```

### admin-screening.spec.ts › ADMIN SCREENING › SC-16 a reviewer without a fresh second factor cannot decide

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-s1a-000@ethio-e2e.invalid (password) failed: {}
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s1a-000@ethio-e2e.invalid (password) failed: {}

   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:369:22)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:175:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:335:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-16-a-reviewer-without-a-fresh-second-factor-cannot-decide-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-f4ca6-second-factor-cannot-decide-mobile-360`; this run carried 3 context file(s); of the same spec: none

### shell.spec.ts › mobile chrome › the menu opens in place

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    60
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    60

  1016 |     const stripBox = await stripRow.boundingBox();
  1017 |     if (!rowBox || !stripBox) throw new Error("Missing aligned category rows");
> 1018 |     expect(Math.abs(rowBox.y - stripBox.y)).toBeLessThanOrEqual(1);
       |                                             ^
  1019 |     expect(Math.abs(rowBox.height - stripBox.height)).toBeLessThanOrEqual(1);
  1020 |     const iconBox = await row.locator("svg").boundingBox();
  1021 |     const nameBox = await row.locator("[data-cut]").boundingBox();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1018:45
```

Context:

```text
          - listitem [ref=e420]:
            - generic [ref=e421]: About
          - listitem [ref=e422]:
            - generic [ref=e423]: How it works
      - navigation "Help" [ref=e424]:
        - heading "Help" [level=2] [ref=e425]
        - list [ref=e426]:
          - listitem [ref=e427]:
            - generic [ref=e428]: Safety
          - listitem [ref=e429]:
            - generic [ref=e430]: Contact
      - navigation "Legal" [ref=e431]:
        - heading "Legal" [level=2] [ref=e432]
        - list [ref=e433]:
          - listitem [ref=e434]:
            - generic [ref=e435]: Terms
          - listitem [ref=e436]:
            - generic [ref=e437]: Privacy
    - paragraph [ref=e439]: © 2026 ethio.com — All rights reserved.
```
```

### admin-translations-console.spec.ts › U4b translations console › TR-40 sync follows a changed Amharic text no person wrote, and keeps one a person wrote

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBeNull()

Received: "canceling statement due to statement timeout"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "canceling statement due to statement timeout"

  1264 |         },
  1265 |       );
> 1266 |       expect(answer.error).toBeNull();
       |                            ^
  1267 |       const result = answer.data as Record<string, unknown>;
  1268 |       expect(typeof result["keys_added"], "TR-40: the answer names the keys added").toBe("number");
  1269 |       expect(Number(result["languages"])).toBeGreaterThanOrEqual(1);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:1266:28
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_sync_ui_keys ({"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"})
```

Context:

```text
          - listitem [ref=e919]:
            - generic [ref=e920]: About
          - listitem [ref=e921]:
            - generic [ref=e922]: How it works
      - navigation "Help" [ref=e923]:
        - heading "Help" [level=2] [ref=e924]
        - list [ref=e925]:
          - listitem [ref=e926]:
            - generic [ref=e927]: Safety
          - listitem [ref=e928]:
            - generic [ref=e929]: Contact
      - navigation "Legal" [ref=e930]:
        - heading "Legal" [level=2] [ref=e931]
        - list [ref=e932]:
          - listitem [ref=e933]:
            - generic [ref=e934]: Terms
          - listitem [ref=e935]:
            - generic [ref=e936]: Privacy
    - paragraph [ref=e938]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

106 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-b<n>nl: e<n>e_par_db<n>it → e<n>e_chi_awsru<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-vs<n>yl: e<n>e_par_gt<n>siu → e<n>e_chi_<n>o<n>cm<n>` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-b<n>nl: e<n>e_par_db<n>it → e<n>e_chi_awsru<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-vs<n>yl: e<n>e_par_gt<n>siu → e<n>e_chi_<n>o<n>cm<n> ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×2 · PR-37 coverage first appearance is stored once, renumbered in either order ×1 · PW-100 every category offers the map; after Save the preview shows the pin ×1 · PW-17 the currency is preselected and searchable by name in one control ×1 · PW-21 a child detail shows only the chosen parent's options and clears on change ×1

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
| smoke | 2026-10-14T01:43:35.308Z | 16.2 min |
| email | 2026-10-14T01:43:33.321Z | 0.2 min |
| shard 1 | 2026-10-14T01:43:39.651Z | 33.6 min |
| shard 2 | 2026-10-14T01:43:36.667Z | 28.6 min |
| shard 3 | 2026-10-14T01:43:29.571Z | 23.6 min |
| shard 4 | 2026-10-14T01:43:33.284Z | 30.2 min |
| shard 5 | 2026-10-14T01:43:47.881Z | 31.6 min |
| shard 6 | 2026-10-14T01:43:28.727Z | 23.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-bundle2.spec.ts` | 68 | 20.0 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 19.3 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 80 | 18.4 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 44 | 16.6 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 54 | 16.0 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 50 | 13.9 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 12.4 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.5 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 9.9 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 9.8 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 9.7 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 52 | 9.6 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 44 | 9.3 min | smoke, shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 9.1 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.1 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 28 | 9.0 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 8.5 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.0 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 7.8 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 34 | 7.5 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.2 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.0 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.7 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 6.5 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 28 | 6.2 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.1 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 16 | 5.9 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.3 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 4.5 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 14 | 4.0 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 3.8 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.5 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 2.3 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 2.1 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.4 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 0.9 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `admin-services.spec.ts` | 8 | 0.5 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-screening.spec.ts` › SC-16 a reviewer without a fresh second factor cannot decide | mobile-360 | 65.2 s |
| `post-wizard-place.spec.ts` › PW-38 a place search moves the pin and fills the street line | desktop-1280 | 59.7 s |
| `admin-attributes-library.spec.ts` › AT-3 link manager: an attribute is linked to a scratch category and unlinked | mobile-360 | 59.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 58.0 s |
| `admin-shell.spec.ts` › A-7 moderator fixture: two sections (All listings, audit), other deep links refused, admin tab still visible | mobile-360 | 56.3 s |
| `admin-translations-console.spec.ts` › TR-40 sync follows a changed Amharic text no person wrote, and keeps one a person wrote | desktop-1280 | 55.8 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 49.4 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 48.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 45.5 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 41.9 s |
| `post-wizard-category.spec.ts` › PW-141 Photos coming soon: the tick shows only with no photo, is saved, draws the ribbon, and goes when a photo is added (bundle 4 steps 14, 15) | mobile-360 | 40.2 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | mobile-360 | 39.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 37.9 s |
| `admin-listings.spec.ts` › AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing | mobile-360 | 37.7 s |
| `admin-listings.spec.ts` › AL-9 Send back to review; the seller reads their own notices and no one else's | desktop-1280 | 37.5 s |
