# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34092851775
- Commit: `d86c7c5fedc38a4462d8e8a37c27dc8ba8f974fe`
- PLATFORM-ORIGIN? the head commit's subject is `Work in progress` — a Lovable auto-push, so suspect platform-injected code before ours.
- Attempt: 1
- Written (UTC): 2026-09-07T07:02:05.050Z
- Passed: 480 · Skipped: 67 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › U4h device language star › TR-28 hreflang alternates equal the anon publication gate — Error: [INC-113] url: http://127.0.0.1:4173/
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-audit.spec.ts › U3 audit & security › IMP-3 server refusals: self, super-admin target, and a non-super caller — Test timeout of 60000ms exceeded.

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

```

Context:

```text
          - listitem [ref=e98]:
            - generic [ref=e99]: About
          - listitem [ref=e100]:
            - generic [ref=e101]: How it works
      - navigation "Help" [ref=e102]:
        - heading "Help" [level=2] [ref=e103]
        - list [ref=e104]:
          - listitem [ref=e105]:
            - generic [ref=e106]: Safety
          - listitem [ref=e107]:
            - generic [ref=e108]: Contact
      - navigation "Legal" [ref=e109]:
        - heading "Legal" [level=2] [ref=e110]
        - list [ref=e111]:
          - listitem [ref=e112]:
            - generic [ref=e113]: Terms
          - listitem [ref=e114]:
            - generic [ref=e115]: Privacy
    - paragraph [ref=e117]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

```

Context:

```text
          - listitem [ref=e236]:
            - generic [ref=e237]: About
          - listitem [ref=e238]:
            - generic [ref=e239]: How it works
      - navigation "Help" [ref=e240]:
        - heading "Help" [level=2] [ref=e241]
        - list [ref=e242]:
          - listitem [ref=e243]:
            - generic [ref=e244]: Safety
          - listitem [ref=e245]:
            - generic [ref=e246]: Contact
      - navigation "Legal" [ref=e247]:
        - heading "Legal" [level=2] [ref=e248]
        - list [ref=e249]:
          - listitem [ref=e250]:
            - generic [ref=e251]: Terms
          - listitem [ref=e252]:
            - generic [ref=e253]: Privacy
    - paragraph [ref=e255]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `changed`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

```

Context:

```text
          - listitem [ref=e98]:
            - generic [ref=e99]: About
          - listitem [ref=e100]:
            - generic [ref=e101]: How it works
      - navigation "Help" [ref=e102]:
        - heading "Help" [level=2] [ref=e103]
        - list [ref=e104]:
          - listitem [ref=e105]:
            - generic [ref=e106]: Safety
          - listitem [ref=e107]:
            - generic [ref=e108]: Contact
      - navigation "Legal" [ref=e109]:
        - heading "Legal" [level=2] [ref=e110]
        - list [ref=e111]:
          - listitem [ref=e112]:
            - generic [ref=e113]: Terms
          - listitem [ref=e114]:
            - generic [ref=e115]: Privacy
    - paragraph [ref=e117]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `changed`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

```

Context:

```text
          - listitem [ref=e236]:
            - generic [ref=e237]: About
          - listitem [ref=e238]:
            - generic [ref=e239]: How it works
      - navigation "Help" [ref=e240]:
        - heading "Help" [level=2] [ref=e241]
        - list [ref=e242]:
          - listitem [ref=e243]:
            - generic [ref=e244]: Safety
          - listitem [ref=e245]:
            - generic [ref=e246]: Contact
      - navigation "Legal" [ref=e247]:
        - heading "Legal" [level=2] [ref=e248]
        - list [ref=e249]:
          - listitem [ref=e250]:
            - generic [ref=e251]: Terms
          - listitem [ref=e252]:
            - generic [ref=e253]: Privacy
    - paragraph [ref=e255]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-CGgrfOFi.js:13856:39 at getResponse (http://127.0.0.1:4173/assets/index-CGgrfOFi.js:13903:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-CGgrfOFi.js:13856:15) at async client (http://127.0.0.1:4173/assets/index-CGgrfOFi.js:16052:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-CGgrfOFi.js:15983:20) at async userNext (http://127.0.0.1:4173/assets/index-CGgrfOFi.js:15969:21) ×3
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
