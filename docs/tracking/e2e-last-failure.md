# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34063211676
- Commit: `fd0df07b1e64f767bc9a63b4e4ad8a66b0b53bb1`
- Attempt: 1
- Written (UTC): 2026-09-06T22:20:52.624Z
- Passed: 491 · Skipped: 69 · Failed: 6
- Gating failures: 6 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 9
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-audit.spec.ts › U3 audit & security › AS-2 filters: an action filter narrows the list — Error: [e2e:pool] in-browser TOTP elevation failed: Auth session missing! (session poll last state: session:7848a966-6448-4d20-a3ef-e65ad93300ca)
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-lifecycle.spec.ts › C2 categories console › CT-13 lifecycle: a typed-slug delete removes the row and its dependents — Error: [e2e:pool] in-browser TOTP elevation failed: Auth session missing! (session poll last state: session:7848a966-6448-4d20-a3ef-e65ad93300ca)
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-lifecycle.spec.ts › C2 categories console › CT-17 create flow: two steps, chained countries + position, image — Error: [e2e:pool] in-browser TOTP elevation failed: Auth session missing! (session poll last state: session:7848a966-6448-4d20-a3ef-e65ad93300ca)
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-translations-console.spec.ts › U4b translations console › TR-1 gating: a permissionless user is refused; a super admin sees the roster — Error: [e2e:pool] in-browser TOTP elevation failed: Auth session missing! (session poll last state: session:7848a966-6448-4d20-a3ef-e65ad93300ca)
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-20m mobile exposes both reorder controls for the parked fence — Error: [e2e:pool] in-browser TOTP elevation failed: Auth session missing! (session poll last state: session:05e8ba98-e372-45d1-8a41-f0e99a1fb2ef)
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-lifecycle.spec.ts › C2 categories console › CT-16 return path: closing a secondary dialog returns to the open editor — Error: [e2e:pool] in-browser TOTP elevation failed: Auth session missing! (session poll last state: session:635c86f5-bfab-4bd5-92f5-083bb03d5505)
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-translations-console.spec.ts › U4b translations console › TR-5 filters live in the URL and survive a reload — Error: [e2e:pool] in-browser TOTP elevation failed: Auth session missing! (session poll last state: session:635c86f5-bfab-4bd5-92f5-083bb03d5505)
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back — Error: [e2e:pool] in-browser TOTP elevation failed: Auth session missing! (session poll last state: session:15c45d69-83f7-4b50-b916-f9af17488000)
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-translations-console.spec.ts › U4b translations console › TR-9 the Amharic runtime still renders after the DB bundle merge — Error: [e2e:pool] in-browser TOTP elevation failed: Auth session missing! (session poll last state: session:3b655e3c-d346-47f5-b91e-4b161899c0e5)

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-15 reorder: Move up flips the order with no step-up, catch-all last

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] in-browser TOTP elevation failed: Auth session missing! (session poll last state: session:7848a966-6448-4d20-a3ef-e65ad93300ca)
```

Context:

```text
          - listitem [ref=e115]:
            - generic [ref=e116]: About
          - listitem [ref=e117]:
            - generic [ref=e118]: How it works
      - navigation "Help" [ref=e119]:
        - heading "Help" [level=2] [ref=e120]
        - list [ref=e121]:
          - listitem [ref=e122]:
            - generic [ref=e123]: Safety
          - listitem [ref=e124]:
            - generic [ref=e125]: Contact
      - navigation "Legal" [ref=e126]:
        - heading "Legal" [level=2] [ref=e127]
        - list [ref=e128]:
          - listitem [ref=e129]:
            - generic [ref=e130]: Terms
          - listitem [ref=e131]:
            - generic [ref=e132]: Privacy
    - paragraph [ref=e134]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-7 sync imports the compiled catalog and reports its counts

- Source: `shard 1`
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

[e2e:l4c] sync route (admin_sync_ui_keys) → 200 {"orphaned": 0, "am_seeded": 0, "en_upserted": 914, "orphans_restored": 0, "keys_added_per_lang": {"am": 914, "om": 914, "ti": 914, "zxa": 914, "zxx": 914, "zxy": 914, "zxx-d": 914, "zxx-m": 914, "zxy-d": 914, "zxy-m": 914, "zxx-de": 914, "zxx-mo": 914, "zxy-de": 914, "zxy-mo": 914}}
pooled user 7848a966-6448-4d20-a3ef-e65ad93300ca
DB stats row: stats read failed: permission denied
```

Context:

```text
          - listitem [ref=e658]:
            - generic [ref=e659]: About
          - listitem [ref=e660]:
            - generic [ref=e661]: How it works
      - navigation "Help" [ref=e662]:
        - heading "Help" [level=2] [ref=e663]
        - list [ref=e664]:
          - listitem [ref=e665]:
            - generic [ref=e666]: Safety
          - listitem [ref=e667]:
            - generic [ref=e668]: Contact
      - navigation "Legal" [ref=e669]:
        - heading "Legal" [level=2] [ref=e670]
        - list [ref=e671]:
          - listitem [ref=e672]:
            - generic [ref=e673]: Terms
          - listitem [ref=e674]:
            - generic [ref=e675]: Privacy
    - paragraph [ref=e677]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-7 sync imports the compiled catalog and reports its counts

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('translations-sync-done')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('translations-sync-done')

[e2e:l4c] sync route (admin_sync_ui_keys) → 200 {"orphaned": 0, "am_seeded": 0, "en_upserted": 914, "orphans_restored": 0, "keys_added_per_lang": {"am": 914, "om": 914, "ti": 914, "zxa": 914, "zxx": 914, "zxy": 914, "zxx-d": 914, "zxx-m": 914, "zxy-d": 914, "zxy-m": 914, "zxx-de": 914, "zxx-mo": 914, "zxy-de": 914, "zxy-mo": 914}}
pooled user 635c86f5-bfab-4bd5-92f5-083bb03d5505
DB stats row: stats read failed: permission denied
```

Context:

```text
          - listitem [ref=e788]:
            - generic [ref=e789]: About
          - listitem [ref=e790]:
            - generic [ref=e791]: How it works
      - navigation "Help" [ref=e792]:
        - heading "Help" [level=2] [ref=e793]
        - list [ref=e794]:
          - listitem [ref=e795]:
            - generic [ref=e796]: Safety
          - listitem [ref=e797]:
            - generic [ref=e798]: Contact
      - navigation "Legal" [ref=e799]:
        - heading "Legal" [level=2] [ref=e800]
        - list [ref=e801]:
          - listitem [ref=e802]:
            - generic [ref=e803]: Terms
          - listitem [ref=e804]:
            - generic [ref=e805]: Privacy
    - paragraph [ref=e807]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-8 Amharic + no horizontal overflow

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:pool] in-browser TOTP elevation failed: Auth session missing! (session poll last state: session:3b655e3c-d346-47f5-b91e-4b161899c0e5)
```

Context:

```text
          - listitem [ref=e728]:
            - generic [ref=e729]: About
          - listitem [ref=e730]:
            - generic [ref=e731]: How it works
      - navigation "Help" [ref=e732]:
        - heading "Help" [level=2] [ref=e733]
        - list [ref=e734]:
          - listitem [ref=e735]:
            - generic [ref=e736]: Safety
          - listitem [ref=e737]:
            - generic [ref=e738]: Contact
      - navigation "Legal" [ref=e739]:
        - heading "Legal" [level=2] [ref=e740]
        - list [ref=e741]:
          - listitem [ref=e742]:
            - generic [ref=e743]: Terms
          - listitem [ref=e744]:
            - generic [ref=e745]: Privacy
    - paragraph [ref=e747]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-7 sync imports the compiled catalog and reports its counts

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

[e2e:l4c] sync route (admin_sync_ui_keys) → 200 {"orphaned": 0, "am_seeded": 0, "en_upserted": 914, "orphans_restored": 0, "keys_added_per_lang": {"am": 914, "om": 914, "ti": 914, "zxa": 914, "zxx": 914, "zxy": 914, "zxx-d": 914, "zxx-m": 914, "zxy-d": 914, "zxy-m": 914, "zxx-de": 914, "zxx-mo": 914, "zxy-de": 914, "zxy-mo": 914}}
pooled user 3b655e3c-d346-47f5-b91e-4b161899c0e5
DB stats row: stats read failed: permission denied
```

Context:

```text
          - listitem [ref=e658]:
            - generic [ref=e659]: About
          - listitem [ref=e660]:
            - generic [ref=e661]: How it works
      - navigation "Help" [ref=e662]:
        - heading "Help" [level=2] [ref=e663]
        - list [ref=e664]:
          - listitem [ref=e665]:
            - generic [ref=e666]: Safety
          - listitem [ref=e667]:
            - generic [ref=e668]: Contact
      - navigation "Legal" [ref=e669]:
        - heading "Legal" [level=2] [ref=e670]
        - list [ref=e671]:
          - listitem [ref=e672]:
            - generic [ref=e673]: Terms
          - listitem [ref=e674]:
            - generic [ref=e675]: Privacy
    - paragraph [ref=e677]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-7 sync imports the compiled catalog and reports its counts

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('translations-sync-done')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('translations-sync-done')

[e2e:l4c] sync route (admin_sync_ui_keys) → 200 {"orphaned": 0, "am_seeded": 0, "en_upserted": 914, "orphans_restored": 0, "keys_added_per_lang": {"am": 914, "om": 914, "ti": 914, "zxa": 914, "zxx": 914, "zxy": 914, "zxx-d": 914, "zxx-m": 914, "zxy-d": 914, "zxy-m": 914, "zxx-de": 914, "zxx-mo": 914, "zxy-de": 914, "zxy-mo": 914}}
pooled user 3b655e3c-d346-47f5-b91e-4b161899c0e5
DB stats row: stats read failed: permission denied
```

Context:

```text
          - listitem [ref=e788]:
            - generic [ref=e789]: About
          - listitem [ref=e790]:
            - generic [ref=e791]: How it works
      - navigation "Help" [ref=e792]:
        - heading "Help" [level=2] [ref=e793]
        - list [ref=e794]:
          - listitem [ref=e795]:
            - generic [ref=e796]: Safety
          - listitem [ref=e797]:
            - generic [ref=e798]: Contact
      - navigation "Legal" [ref=e799]:
        - heading "Legal" [level=2] [ref=e800]
        - list [ref=e801]:
          - listitem [ref=e802]:
            - generic [ref=e803]: Terms
          - listitem [ref=e804]:
            - generic [ref=e805]: Privacy
    - paragraph [ref=e807]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×20
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-ClVsKtaS.js:13856:39 at getResponse (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:13903:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:13856:15) at async client (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:16052:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:15983:20) at async userNext (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:15969:21) ×3
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×4
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog ×2
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×8
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog ×2
```

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

```text
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×4
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/factors/479f8451-73d3-4113-a787-f5dcb894da3f/verify ({"code":"unexpected_failure","message":"Failed to update sessions. ERROR: deadlock detected (SQLSTATE 40P01)"})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×3
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×4
```
