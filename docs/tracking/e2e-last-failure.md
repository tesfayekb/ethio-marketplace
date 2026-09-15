# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35011187482
- Commit: `a51dc1587f5290d61ff6eb4445b143aa4fde04e4`
- Attempt: 1
- Written (UTC): 2026-09-15T19:11:43.722Z
- Passed: 599 · Skipped: 68 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 3
- Post-test errors (DEC-059, non-gating): none
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · auth-signout.spec.ts › U0j sign-out hard reset › SO-3b reload path: a cleared token means /admin never renders on mount — TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · auth-signout.spec.ts › U0k session policy › SP-2 stay signed in extends past the original deadline — TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-translations-console.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key — Error: TR-12 step 3: the bulk summary never rendered within 90 s (3 keys queued for scope zxx-mo)

## shell.spec.ts › U4h device language star › TR-28 hreflang alternates equal the anon publication gate

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: [INC-113] url: http://127.0.0.1:4173/
[INC-113] html lang: en
[INC-113] provider publicLanguages: {"gateReady":true,"active":"en","star":null,"codes":["en"]}
[INC-113] rendered options: (none) · stars: (none) · menu closed (options are portalled)

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Array [
+   "am",
    "en",
    "x-default",
  ]
```

Context:

```text
          - listitem [ref=e123]:
            - generic [ref=e124]: About
          - listitem [ref=e125]:
            - generic [ref=e126]: How it works
      - navigation "Help" [ref=e127]:
        - heading "Help" [level=2] [ref=e128]
        - list [ref=e129]:
          - listitem [ref=e130]:
            - generic [ref=e131]: Safety
          - listitem [ref=e132]:
            - generic [ref=e133]: Contact
      - navigation "Legal" [ref=e134]:
        - heading "Legal" [level=2] [ref=e135]
        - list [ref=e136]:
          - listitem [ref=e137]:
            - generic [ref=e138]: Terms
          - listitem [ref=e139]:
            - generic [ref=e140]: Privacy
    - paragraph [ref=e142]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).
