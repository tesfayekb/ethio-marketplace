# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34062047712
- Commit: `df927cf002af9178dd2bc2c8aa649a562761d841`
- Attempt: 1
- Written (UTC): 2026-09-06T21:55:38.594Z
- Passed: 457 · Skipped: 70 · Failed: 9
- Gating failures: 9 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 7
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes.spec.ts › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth) — Error: [e2e:pool] in-browser TOTP elevation failed: Auth session missing!
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer — Error: [e2e:pool] in-browser TOTP elevation failed: Auth session missing!
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-roles.spec.ts › U2 roles console › RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles — Error: [e2e:pool] in-browser TOTP elevation failed: Auth session missing!
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-translations-console.spec.ts › U4b translations console › TR-23 machine translation keeps placeholders, and the editor repairs a mangled one — Error: expect(received).toContain(expected) // indexOf
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-20m mobile exposes both reorder controls for the parked fence — Error: [e2e:pool] in-browser TOTP elevation failed: Auth session missing!
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-console.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth — Error: [e2e:pool] in-browser TOTP elevation failed: Auth session missing!
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back — Error: [e2e:pool] in-browser TOTP elevation failed: Auth session missing!

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

## admin-translations-console.spec.ts › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "⟪am⟫"
Received string:    ""
```

Context:

```text
          - listitem [ref=e124]:
            - generic [ref=e125]: About
          - listitem [ref=e126]:
            - generic [ref=e127]: How it works
      - navigation "Help" [ref=e128]:
        - heading "Help" [level=2] [ref=e129]
        - list [ref=e130]:
          - listitem [ref=e131]:
            - generic [ref=e132]: Safety
          - listitem [ref=e133]:
            - generic [ref=e134]: Contact
      - navigation "Legal" [ref=e135]:
        - heading "Legal" [level=2] [ref=e136]
        - list [ref=e137]:
          - listitem [ref=e138]:
            - generic [ref=e139]: Terms
          - listitem [ref=e140]:
            - generic [ref=e141]: Privacy
    - paragraph [ref=e143]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-13 the placeholder validator flags a machine write too

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e124]:
            - generic [ref=e125]: About
          - listitem [ref=e126]:
            - generic [ref=e127]: How it works
      - navigation "Help" [ref=e128]:
        - heading "Help" [level=2] [ref=e129]
        - list [ref=e130]:
          - listitem [ref=e131]:
            - generic [ref=e132]: Safety
          - listitem [ref=e133]:
            - generic [ref=e134]: Contact
      - navigation "Legal" [ref=e135]:
        - heading "Legal" [level=2] [ref=e136]
        - list [ref=e137]:
          - listitem [ref=e138]:
            - generic [ref=e139]: Terms
          - listitem [ref=e140]:
            - generic [ref=e141]: Privacy
    - paragraph [ref=e143]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-16 the History drawer lists revisions and restores one as a new edit

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('history-drawer-e2e-scratch-34062047712-1-1-mobile-360-11-tr16').getByTestId('history-action-e2e-scratch-34062047712-1-1-mobile-360-11-tr16-0')
Expected: "Human edit"
Received: "Machine write"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('history-drawer-e2e-scratch-34062047712-1-1-mobile-360-11-tr16').getByTestId('history-action-e2e-scratch-34062047712-1-1-mobile-360-11-tr16-0')
    14 × locator resolved to <div data-testid="history-action-e2e-scratch-34062047712-1-1-mobile-360-11-tr16-0" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Machine write</div>
       - unexpected value "Machine write"

```

Context:

```text
      - listitem [ref=e12]:
        - generic [ref=e13]:
          - generic [ref=e14]: Machine write
          - generic [ref=e15]: Edited
          - generic [ref=e16]: Human
        - paragraph [ref=e17]: 5 seconds ago · e2e+34062047712-1-3029-2-b7mpkj
        - paragraph [ref=e18]: የሰው እርማት
        - generic [ref=e19]:
          - paragraph [ref=e20]: Restores this text as an EDITED value — history keeps everything
          - button "Restore this value" [ref=e21] [cursor=pointer]
      - listitem [ref=e22]:
        - generic [ref=e23]:
          - generic [ref=e24]: Human edit
          - generic [ref=e25]: Untranslated
          - generic [ref=e26]: Human
        - paragraph [ref=e27]: 5 seconds ago · e2e+34062047712-1-3029-2-b7mpkj
        - paragraph [ref=e28]: (no value)
        - button "Clear instead" [ref=e29] [cursor=pointer]
    - status [ref=e30]: Restored.
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

## admin-translations-console.spec.ts › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "⟪am⟫"
Received string:    ""
```

Context:

```text
          - listitem [ref=e212]:
            - generic [ref=e213]: About
          - listitem [ref=e214]:
            - generic [ref=e215]: How it works
      - navigation "Help" [ref=e216]:
        - heading "Help" [level=2] [ref=e217]
        - list [ref=e218]:
          - listitem [ref=e219]:
            - generic [ref=e220]: Safety
          - listitem [ref=e221]:
            - generic [ref=e222]: Contact
      - navigation "Legal" [ref=e223]:
        - heading "Legal" [level=2] [ref=e224]
        - list [ref=e225]:
          - listitem [ref=e226]:
            - generic [ref=e227]: Terms
          - listitem [ref=e228]:
            - generic [ref=e229]: Privacy
    - paragraph [ref=e231]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-13 the placeholder validator flags a machine write too

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e212]:
            - generic [ref=e213]: About
          - listitem [ref=e214]:
            - generic [ref=e215]: How it works
      - navigation "Help" [ref=e216]:
        - heading "Help" [level=2] [ref=e217]
        - list [ref=e218]:
          - listitem [ref=e219]:
            - generic [ref=e220]: Safety
          - listitem [ref=e221]:
            - generic [ref=e222]: Contact
      - navigation "Legal" [ref=e223]:
        - heading "Legal" [level=2] [ref=e224]
        - list [ref=e225]:
          - listitem [ref=e226]:
            - generic [ref=e227]: Terms
          - listitem [ref=e228]:
            - generic [ref=e229]: Privacy
    - paragraph [ref=e231]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-23 machine translation keeps placeholders, and the editor repairs a mangled one

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "{name}"
Received string:    ""
```

Context:

```text
          - listitem [ref=e212]:
            - generic [ref=e213]: About
          - listitem [ref=e214]:
            - generic [ref=e215]: How it works
      - navigation "Help" [ref=e216]:
        - heading "Help" [level=2] [ref=e217]
        - list [ref=e218]:
          - listitem [ref=e219]:
            - generic [ref=e220]: Safety
          - listitem [ref=e221]:
            - generic [ref=e222]: Contact
      - navigation "Legal" [ref=e223]:
        - heading "Legal" [level=2] [ref=e224]
        - list [ref=e225]:
          - listitem [ref=e226]:
            - generic [ref=e227]: Terms
          - listitem [ref=e228]:
            - generic [ref=e229]: Privacy
    - paragraph [ref=e231]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-16 the History drawer lists revisions and restores one as a new edit

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('history-drawer-e2e-scratch-34062047712-4-4-desktop-1280-11-tr16').getByTestId('history-action-e2e-scratch-34062047712-4-4-desktop-1280-11-tr16-0')
Expected: "Human edit"
Received: "Machine write"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('history-drawer-e2e-scratch-34062047712-4-4-desktop-1280-11-tr16').getByTestId('history-action-e2e-scratch-34062047712-4-4-desktop-1280-11-tr16-0')
    14 × locator resolved to <div data-testid="history-action-e2e-scratch-34062047712-4-4-desktop-1280-11-tr16-0" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Machine write</div>
       - unexpected value "Machine write"

```

Context:

```text
      - listitem [ref=e12]:
        - generic [ref=e13]:
          - generic [ref=e14]: Machine write
          - generic [ref=e15]: Edited
          - generic [ref=e16]: Human
        - paragraph [ref=e17]: 5 seconds ago · e2e+34062047712-4-3095-2-ac9jxv
        - paragraph [ref=e18]: የሰው እርማት
        - generic [ref=e19]:
          - paragraph [ref=e20]: Restores this text as an EDITED value — history keeps everything
          - button "Restore this value" [ref=e21] [cursor=pointer]
      - listitem [ref=e22]:
        - generic [ref=e23]:
          - generic [ref=e24]: Human edit
          - generic [ref=e25]: Untranslated
          - generic [ref=e26]: Human
        - paragraph [ref=e27]: 5 seconds ago · e2e+34062047712-4-3095-2-ac9jxv
        - paragraph [ref=e28]: (no value)
        - button "Clear instead" [ref=e29] [cursor=pointer]
    - status [ref=e30]: Restored.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×8
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×4
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog ×7
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×4
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog ×10
```
