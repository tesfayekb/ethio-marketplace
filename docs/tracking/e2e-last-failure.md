# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36293804292 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36293804292
- Commit: `6f5648db158d0c0b77104bfab8ee9d57847f697d`
- Attempt: 1
- Written (UTC): 2026-09-27T04:33:51.497Z
- Post-test warnings: 0
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › U4h device language star › TR-28 hreflang alternates equal the anon publication gate — Error: [INC-113] url: http://127.0.0.1:4173/

## Flaky bodies (DEC-078)

### shell.spec.ts › U4h device language star › TR-28 hreflang alternates equal the anon publication gate

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: [INC-113] url: http://127.0.0.1:4173/
[INC-113] html lang: en
[INC-113] provider publicLanguages: {"gateReady":true,"degraded":false,"active":"en","star":null,"codes":["en","am"]}
[INC-113] rendered options: (none) · stars: (none) · menu closed (options are portalled)

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Array [
    "am",
    "en",
    "x-default",
+   "zxb-51de",
  ]
```

Context:

```text
          - listitem [ref=e216]:
            - generic [ref=e217]: About
          - listitem [ref=e218]:
            - generic [ref=e219]: How it works
      - navigation "Help" [ref=e220]:
        - heading "Help" [level=2] [ref=e221]
        - list [ref=e222]:
          - listitem [ref=e223]:
            - generic [ref=e224]: Safety
          - listitem [ref=e225]:
            - generic [ref=e226]: Contact
      - navigation "Legal" [ref=e227]:
        - heading "Legal" [level=2] [ref=e228]
        - list [ref=e229]:
          - listitem [ref=e230]:
            - generic [ref=e231]: Terms
          - listitem [ref=e232]:
            - generic [ref=e233]: Privacy
    - paragraph [ref=e235]: © 2026 ethio.com — All rights reserved.
```
```
