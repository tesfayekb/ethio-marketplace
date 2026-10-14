# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38501197463
- Commit: `d76a27f1536f085351ac148010f58d23350ad9cc`
- Attempt: 1
- Written (UTC): 2026-10-14T03:08:15.249Z
- Passed: 1664 · Skipped: 126 · Failed: 9
- Gating failures: 9 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 6
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-17 The listing's page: opened from All listings, Remove with a reason, the history's newest line, the buyer's view — Error: expect(locator).toHaveCount(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-place.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored — Error: [INC-562] step 7 did not come after Next. Saves (draft, identity): none answered. Refusal lines shown: none.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-place.spec.ts › POSTING WIZARD › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city — Error: [e2e:setup] POST /logout?scope=global failed (504): upstream request timeout
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity — Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard-place.spec.ts › POSTING WIZARD › PW-81 a prefilled city counts as chosen: no mark, Next passes untouched — Error: [e2e:pool] reaping e2e-pool-s5b-010@ethio-e2e.invalid (factors) failed: {}
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · viewing-place.spec.ts › VIEWING PLACE — the account doors (D106) › VP-2 a place that is not shown is refused, and the saved place stays — Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout

## Flaky bodies (DEC-078)

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-17 The listing's page: opened from All listings, Remove with a reason, the history's newest line, the buyer's view

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('listings-move-dialog')
Expected: 0
Received: 1
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for getByTestId('listings-move-dialog')
    24 × locator resolved to 1 element
       - unexpected value "1"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('listings-move-dialog')
Expected: 0
Received: 1
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for getByTestId('listings-move-dialog')
    24 × locator resolved to 1 element
       - unexpected value "1"


  940 |     if (note !== undefined) await dialog.getByTestId("listings-move-note").fill(note);
  941 |     await dialog.getByTestId("listings-move-confirm").click();
> 942 |     await expect(dialog).toHaveCount(0, { timeout: 20000 });
      |                          ^
  943 |   }
  944 |
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 504 ()
[client-error] HTTP 504 GET https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/user (upstream request timeout)
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
```

Context:

```text
        - generic:
          - button [disabled]: Cancel
          - button [disabled]: Remove
    - button:
      - img
      - generic: Close
  - dialog [ref=e3]:
    - heading "Two-factor verification required" [level=2] [ref=e4]
    - generic [ref=e5]:
      - paragraph [ref=e6]: Two-factor verification required
      - paragraph [ref=e7]: This action requires two-factor verification. Enter the current code from your authenticator app.
      - generic [ref=e8]: Six-digit code
      - textbox "Six-digit code" [active] [ref=e9]:
        - /placeholder: "123456"
      - button "Verify and continue" [disabled]
      - button "Cancel" [ref=e10] [cursor=pointer]
    - button "Close" [ref=e11] [cursor=pointer]:
      - img [ref=e12]
      - generic [ref=e15]: Close
```
```

### post-wizard-place.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [INC-562] step 7 did not come after Next. Saves (draft, identity): none answered. Refusal lines shown: none.
--- further error 1 ---
Error: [INC-562] step 7 did not come after Next. Saves (draft, identity): none answered. Refusal lines shown: none.

   at helpers/posting.ts:2800

  2798 |       .allInnerTexts()
  2799 |       .catch(() => [] as string[]);
> 2800 |     throw new Error(
       |           ^
  2801 |       `[INC-562] step ${String(step)} did not come after Next. Saves (draft, identity): ${
  2802 |         answered.join(" | ") || "none answered"
  2803 |       }. Refusal lines shown: ${shown.join(" | ") || "none"}.`,
    at nextToStep (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:2800:11)
    at reachStep7 (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:446:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:456:23
[cause]: Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-7')
Expected: visible
Timeout: 10000ms
Error: element(s) not found
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-12-who-the-alias-is-checked-against-the-door-messages-cannot-be-switched-off-and-a-shown-channel-is-stored-mobile-360` — Playwright's name `post-wizard-place-POSTING--17792-d-a-shown-channel-is-stored-mobile-360`; this run carried 3 context file(s); of the same spec: none

### post-wizard-place.spec.ts › POSTING WIZARD › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /logout?scope=global failed (504): upstream request timeout
--- further error 1 ---
Error: [e2e:setup] POST /logout?scope=global failed (504): upstream request timeout

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:378:3)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1067:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-80-a-city-is-required-marked-before-Next-refused-and-scrolled-to-on-Next-cleared-by-a-city-mobile-360` — Playwright's name `post-wizard-place-POSTING--8f238-o-on-Next-cleared-by-a-city-mobile-360`; this run carried 3 context file(s); of the same spec: none

### smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:372:23)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/smoke-auth-i18n.spec.ts:20:16
```

Context: context file not found for `smoke-auth-i18n-smoke-sign-in-header-identity-Amharic-switch-360px-overflow-sign-out-private-identity-mobile-360` — Playwright's name `smoke-auth-i18n-smoke-sign-8cacc-w-sign-out-private-identity-mobile-360`; this run carried 3 context file(s); of the same spec: none

### post-wizard-place.spec.ts › POSTING WIZARD › PW-81 a prefilled city counts as chosen: no mark, Next passes untouched

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s5b-010@ethio-e2e.invalid (factors) failed: {}
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s5b-010@ethio-e2e.invalid (factors) failed: {}

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
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1163:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-81-a-prefilled-city-counts-as-chosen-no-mark-Next-passes-untouched-desktop-1280` — Playwright's name `post-wizard-place-POSTING--40d61--mark-Next-passes-untouched-desktop-1280`; this run carried 3 context file(s); of the same spec: none

### viewing-place.spec.ts › VIEWING PLACE — the account doors (D106) › VP-2 a place that is not shown is refused, and the saved place stays

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:372:23)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at signedIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:52:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:117:25
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-account-doors-D106-VP-2-a-place-that-is-not-shown-is-refused-and-the-saved-place-stays-desktop-1280` — Playwright's name `viewing-place-VIEWING-PLAC-b8ebe-d-and-the-saved-place-stays-desktop-1280`; this run carried 3 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

112 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 12 | shard 2, shard 3, shard 6 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>n<n>do<n>: e<n>e_par_aeqqsv → e<n>e_chi_<n>pxps` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-jujdcg: e<n>e_par_s<n>ma<n> → e<n>e_chi_<n>cfrq` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>n<n>do<n>: e<n>e_par_aeqqsv → e<n>e_chi_<n>pxps ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-jujdcg: e<n>e_par_s<n>ma<n> → e<n>e_chi_<n>cfrq ×1

Off the allowlist:

### listing not found

- Count: 12 · Sources: shard 2, shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-61 a category change resets details, title, description and price, and Undo w ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · admin tables never overflow horizontally ×1 · category rows carry DISTINCT icons, not one repeated glyph ×1 · every rail row carries a leading icon on one gutter ×1 · LY-6 at 360 the open currency list is above the sticky action bar ×1

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
| smoke | 2026-10-14T02:31:20.768Z | 16.4 min |
| email | 2026-10-14T02:31:15.292Z | 0.2 min |
| shard 1 | 2026-10-14T02:31:20.056Z | 36.5 min |
| shard 2 | 2026-10-14T02:31:12.897Z | 32.6 min |
| shard 3 | 2026-10-14T02:31:32.724Z | 32.9 min |
| shard 4 | 2026-10-14T02:31:18.655Z | 32.2 min |
| shard 5 | 2026-10-14T02:31:15.297Z | 32.4 min |
| shard 6 | 2026-10-14T02:31:25.509Z | 32.7 min |
| changed | 2026-10-14T02:31:21.149Z | 9.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-screening.spec.ts` | 76 | 28.2 min | shard 1, shard 4, changed |
| `post-wizard-specs.spec.ts` | 80 | 26.5 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 22.1 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 54 | 21.0 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 20.4 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 19.3 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 44 | 15.0 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 14.1 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 13.9 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 50 | 13.9 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 13.1 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 52 | 12.3 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 11.3 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 10.9 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 9.8 min | smoke, shard 2, shard 5 |
| `feed-screens.spec.ts` | 28 | 8.7 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 8.6 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 8.6 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 8.5 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.4 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 7.9 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.7 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 7.6 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 7.6 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 7.5 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 7.0 min | shard 3, shard 6 |
| `feed-index.spec.ts` | 28 | 6.2 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 6.0 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 16 | 5.6 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 4.2 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 16 | 3.8 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 3.7 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.0 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.9 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.4 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.1 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.1 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.9 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 1.6 min | smoke, shard 3, shard 6 |
| `admin-services.spec.ts` | 16 | 1.4 min | shard 1, shard 4, changed |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-roles.spec.ts` › RP-5 delete guards: members block deletion; typed confirm deletes | mobile-360 | 118.1 s |
| `admin-listings.spec.ts` › AL-17 The listing's page: opened from All listings, Remove with a reason, the history's newest line, the buyer's view | mobile-360 | 86.5 s |
| `post-wizard-place.spec.ts` › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city | mobile-360 | 71.5 s |
| `viewing-place.spec.ts` › VP-2 a place that is not shown is refused, and the saved place stays | desktop-1280 | 67.2 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 63.9 s |
| `smoke-auth-i18n.spec.ts` › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity | mobile-360 | 63.4 s |
| `post-wizard-place.spec.ts` › PW-81 a prefilled city counts as chosen: no mark, Next passes untouched | desktop-1280 | 62.2 s |
| `admin-listings.spec.ts` › AL-16 The listing page's door: who reads what, drafts never, a pin and an address named but never shown | mobile-360 | 59.2 s |
| `post-wizard-place.spec.ts` › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored | mobile-360 | 59.0 s |
| `posting-routes.spec.ts` › PR-24 a seller without a public name, or a person without a first name, is refused at publish (INC-423) | mobile-360 | 56.1 s |
| `admin-listings.spec.ts` › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view | mobile-360 | 55.3 s |
| `admin-screening.spec.ts` › SC-19 a move to live with no session leaves the photo held: no buyer reads it or gets it as the card's cover (D158) | desktop-1280 | 54.8 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 54.4 s |
| `admin-translations-console.spec.ts` › TR-7b sync after a step-up prompt still reports its counts | desktop-1280 | 54.1 s |
| `post-wizard-place.spec.ts` › PW-33 a region alone never lists itself; its city does (W6 R2) | desktop-1280 | 52.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38501197463-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38501197463-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38501197463-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 38501197463-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38501197463-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38501197463-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 38501197463-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38501197463-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38501197463-changed
```

## admin-roles.spec.ts › U2 roles console › RP-5 delete guards: members block deletion; typed confirm deletes

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect.toHaveURL: Target page, context or browser has been closed

  307 |     await page.getByTestId("role-delete").click();
  308 |     await stepUpIfPrompted(page, secret);
> 309 |     await expect(page).toHaveURL(/\/admin\/roles\/?$/, { timeout: 20000 });
      |                        ^
  310 |     await waitForHydration(page);
  311 |     await expect(await searchRole(page, name)).toHaveCount(0);
  312 |     await expect(page.getByText(en["admin.roles.noMatch"])).toBeVisible({ timeout: 20000 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:309:24
```

Context:

```text
          - listitem [ref=e995]:
            - generic [ref=e996]: About
          - listitem [ref=e997]:
            - generic [ref=e998]: How it works
      - navigation "Help" [ref=e999]:
        - heading "Help" [level=2] [ref=e1000]
        - list [ref=e1001]:
          - listitem [ref=e1002]:
            - generic [ref=e1003]: Safety
          - listitem [ref=e1004]:
            - generic [ref=e1005]: Contact
      - navigation "Legal" [ref=e1006]:
        - heading "Legal" [level=2] [ref=e1007]
        - list [ref=e1008]:
          - listitem [ref=e1009]:
            - generic [ref=e1010]: Terms
          - listitem [ref=e1011]:
            - generic [ref=e1012]: Privacy
    - paragraph [ref=e1014]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-18 the preview counts the photos not checked by AI, and Approve approves them with the ad (D158)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:sc] seeding photos failed: null value in column "unscreened" of relation "listing_photos" violates not-null constraint
--- further error 1 ---
Error: [e2e:sc] seeding photos failed: null value in column "unscreened" of relation "listing_photos" violates not-null constraint

  804 |       .select("id, display_order");
  805 |     if (error || !data || data.length !== 2) {
> 806 |       throw new Error(`[e2e:sc] seeding photos failed: ${error?.message ?? "no rows"}`);
      |             ^
  807 |     }
  808 |     const sorted = [...data].sort((a, b) => a.display_order - b.display_order);
  809 |     return { held: sorted[0]!.id as string, screened: sorted[1]!.id as string };
    at seedHeldPhotos (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:806:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:872:20
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-18-the-preview-counts-the-photos-not-checked-by-AI-and-Approve-approves-them-with-the-ad-D158-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-638f2-oves-them-with-the-ad-D158--mobile-360`; this run carried 3 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-19 a move to live with no session leaves the photo held: no buyer reads it or gets it as the card's cover (D158)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:sc] seeding photos failed: null value in column "unscreened" of relation "listing_photos" violates not-null constraint
--- further error 1 ---
Error: [e2e:sc] seeding photos failed: null value in column "unscreened" of relation "listing_photos" violates not-null constraint

  804 |       .select("id, display_order");
  805 |     if (error || !data || data.length !== 2) {
> 806 |       throw new Error(`[e2e:sc] seeding photos failed: ${error?.message ?? "no rows"}`);
      |             ^
  807 |     }
  808 |     const sorted = [...data].sort((a, b) => a.display_order - b.display_order);
  809 |     return { held: sorted[0]!.id as string, screened: sorted[1]!.id as string };
    at seedHeldPhotos (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:806:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:903:20
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-19-a-move-to-live-with-no-session-leaves-the-photo-held-no-buyer-reads-it-or-gets-it-as-the-card-s-cover-D158-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-fbe09-t-as-the-card-s-cover-D158--mobile-360`; this run carried 3 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-18 the preview counts the photos not checked by AI, and Approve approves them with the ad (D158)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:sc] seeding photos failed: null value in column "unscreened" of relation "listing_photos" violates not-null constraint
--- further error 1 ---
Error: [e2e:sc] seeding photos failed: null value in column "unscreened" of relation "listing_photos" violates not-null constraint

  804 |       .select("id, display_order");
  805 |     if (error || !data || data.length !== 2) {
> 806 |       throw new Error(`[e2e:sc] seeding photos failed: ${error?.message ?? "no rows"}`);
      |             ^
  807 |     }
  808 |     const sorted = [...data].sort((a, b) => a.display_order - b.display_order);
  809 |     return { held: sorted[0]!.id as string, screened: sorted[1]!.id as string };
    at seedHeldPhotos (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:806:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:872:20
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-18-the-preview-counts-the-photos-not-checked-by-AI-and-Approve-approves-them-with-the-ad-D158-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-638f2-oves-them-with-the-ad-D158--desktop-1280`; this run carried 3 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-19 a move to live with no session leaves the photo held: no buyer reads it or gets it as the card's cover (D158)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:sc] seeding photos failed: null value in column "unscreened" of relation "listing_photos" violates not-null constraint
--- further error 1 ---
Error: [e2e:sc] seeding photos failed: null value in column "unscreened" of relation "listing_photos" violates not-null constraint

  804 |       .select("id, display_order");
  805 |     if (error || !data || data.length !== 2) {
> 806 |       throw new Error(`[e2e:sc] seeding photos failed: ${error?.message ?? "no rows"}`);
      |             ^
  807 |     }
  808 |     const sorted = [...data].sort((a, b) => a.display_order - b.display_order);
  809 |     return { held: sorted[0]!.id as string, screened: sorted[1]!.id as string };
    at seedHeldPhotos (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:806:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:903:20
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-19-a-move-to-live-with-no-session-leaves-the-photo-held-no-buyer-reads-it-or-gets-it-as-the-card-s-cover-D158-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-fbe09-t-as-the-card-s-cover-D158--desktop-1280`; this run carried 3 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-18 the preview counts the photos not checked by AI, and Approve approves them with the ad (D158)

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:sc] seeding photos failed: null value in column "unscreened" of relation "listing_photos" violates not-null constraint
--- further error 1 ---
Error: [e2e:sc] seeding photos failed: null value in column "unscreened" of relation "listing_photos" violates not-null constraint

  804 |       .select("id, display_order");
  805 |     if (error || !data || data.length !== 2) {
> 806 |       throw new Error(`[e2e:sc] seeding photos failed: ${error?.message ?? "no rows"}`);
      |             ^
  807 |     }
  808 |     const sorted = [...data].sort((a, b) => a.display_order - b.display_order);
  809 |     return { held: sorted[0]!.id as string, screened: sorted[1]!.id as string };
    at seedHeldPhotos (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:806:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:872:20
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-18-the-preview-counts-the-photos-not-checked-by-AI-and-Approve-approves-them-with-the-ad-D158-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-638f2-oves-them-with-the-ad-D158--mobile-360`; this run carried 3 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-19 a move to live with no session leaves the photo held: no buyer reads it or gets it as the card's cover (D158)

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:sc] seeding photos failed: null value in column "unscreened" of relation "listing_photos" violates not-null constraint
--- further error 1 ---
Error: [e2e:sc] seeding photos failed: null value in column "unscreened" of relation "listing_photos" violates not-null constraint

  804 |       .select("id, display_order");
  805 |     if (error || !data || data.length !== 2) {
> 806 |       throw new Error(`[e2e:sc] seeding photos failed: ${error?.message ?? "no rows"}`);
      |             ^
  807 |     }
  808 |     const sorted = [...data].sort((a, b) => a.display_order - b.display_order);
  809 |     return { held: sorted[0]!.id as string, screened: sorted[1]!.id as string };
    at seedHeldPhotos (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:806:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:903:20
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-19-a-move-to-live-with-no-session-leaves-the-photo-held-no-buyer-reads-it-or-gets-it-as-the-card-s-cover-D158-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-fbe09-t-as-the-card-s-cover-D158--mobile-360`; this run carried 3 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-18 the preview counts the photos not checked by AI, and Approve approves them with the ad (D158)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:sc] seeding photos failed: null value in column "unscreened" of relation "listing_photos" violates not-null constraint
--- further error 1 ---
Error: [e2e:sc] seeding photos failed: null value in column "unscreened" of relation "listing_photos" violates not-null constraint

  804 |       .select("id, display_order");
  805 |     if (error || !data || data.length !== 2) {
> 806 |       throw new Error(`[e2e:sc] seeding photos failed: ${error?.message ?? "no rows"}`);
      |             ^
  807 |     }
  808 |     const sorted = [...data].sort((a, b) => a.display_order - b.display_order);
  809 |     return { held: sorted[0]!.id as string, screened: sorted[1]!.id as string };
    at seedHeldPhotos (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:806:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:872:20
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-18-the-preview-counts-the-photos-not-checked-by-AI-and-Approve-approves-them-with-the-ad-D158-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-638f2-oves-them-with-the-ad-D158--desktop-1280`; this run carried 3 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-19 a move to live with no session leaves the photo held: no buyer reads it or gets it as the card's cover (D158)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:sc] seeding photos failed: null value in column "unscreened" of relation "listing_photos" violates not-null constraint
--- further error 1 ---
Error: [e2e:sc] seeding photos failed: null value in column "unscreened" of relation "listing_photos" violates not-null constraint

  804 |       .select("id, display_order");
  805 |     if (error || !data || data.length !== 2) {
> 806 |       throw new Error(`[e2e:sc] seeding photos failed: ${error?.message ?? "no rows"}`);
      |             ^
  807 |     }
  808 |     const sorted = [...data].sort((a, b) => a.display_order - b.display_order);
  809 |     return { held: sorted[0]!.id as string, screened: sorted[1]!.id as string };
    at seedHeldPhotos (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:806:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:903:20
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-19-a-move-to-live-with-no-session-leaves-the-photo-held-no-buyer-reads-it-or-gets-it-as-the-card-s-cover-D158-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-fbe09-t-as-the-card-s-cover-D158--desktop-1280`; this run carried 3 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-1n1do4: e2e_par_aeqqsv → e2e_chi_64pxps
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_delete_role ({"code":"P0001","details":null,"hint":null,"message":"role has members"})
[client-error] console.error: Failed to load resource: the server responded with a status of 504 ()
[client-error] HTTP 504 GET https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/user (upstream request timeout)
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-jujdcg: e2e_par_s9ma07 → e2e_chi_29cfrq
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
