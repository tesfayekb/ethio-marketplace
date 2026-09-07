# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34079652066
- Commit: `8483785bdcd734cf464ce6b89d5b5af7b106aabc`
- Attempt: 1
- Written (UTC): 2026-09-07T03:34:57.036Z
- Passed: 459 · Skipped: 67 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-console.spec.ts › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll — Error: window target at 1240

## admin-roles.spec.ts › U2 roles console › RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('role-permission-reserved-roles:update')
Expected substring: "System-managed — cannot be granted to custom roles"
Received string:    "በሥርዓቱ የሚተዳደር — ለብጁ ሚናዎች ሊሰጥ አይችልም"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('role-permission-reserved-roles:update')
    14 × locator resolved to <span class="text-xs text-muted-foreground" data-testid="role-permission-reserved-roles:update">በሥርዓቱ የሚተዳደር — ለብጁ ሚናዎች ሊሰጥ አይችልም</span>
       - unexpected value "በሥርዓቱ የሚተዳደር — ለብጁ ሚናዎች ሊሰጥ አይችልም"

```

Context:

```text
          - listitem [ref=e500]:
            - generic [ref=e501]: ስለ እኛ
          - listitem [ref=e502]:
            - generic [ref=e503]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e504]:
        - heading "እገዛ" [level=2] [ref=e505]
        - list [ref=e506]:
          - listitem [ref=e507]:
            - generic [ref=e508]: ደህንነት
          - listitem [ref=e509]:
            - generic [ref=e510]: ያግኙን
      - navigation "ሕጋዊ" [ref=e511]:
        - heading "ሕጋዊ" [level=2] [ref=e512]
        - list [ref=e513]:
          - listitem [ref=e514]:
            - generic [ref=e515]: ውሎች
          - listitem [ref=e516]:
            - generic [ref=e517]: ግላዊነት
    - paragraph [ref=e519]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## admin-roles.spec.ts › U2 roles console › RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('role-permission-baseline-account_panel:access')
Expected substring: "Everyone has this via the user role"
Received string:    "ሁሉም ሰው በ«ተጠቃሚ» ሚና በኩል ይህ አለው"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('role-permission-baseline-account_panel:access')
    12 × locator resolved to <div data-testid="role-permission-baseline-account_panel:access" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">ሁሉም ሰው በ«ተጠቃሚ» ሚና በኩል ይህ አለው</div>
       - unexpected value "ሁሉም ሰው በ«ተጠቃሚ» ሚና በኩል ይህ አለው"

```

Context:

```text
          - listitem [ref=e500]:
            - generic [ref=e501]: ስለ እኛ
          - listitem [ref=e502]:
            - generic [ref=e503]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e504]:
        - heading "እገዛ" [level=2] [ref=e505]
        - list [ref=e506]:
          - listitem [ref=e507]:
            - generic [ref=e508]: ደህንነት
          - listitem [ref=e509]:
            - generic [ref=e510]: ያግኙን
      - navigation "ሕጋዊ" [ref=e511]:
        - heading "ሕጋዊ" [level=2] [ref=e512]
        - list [ref=e513]:
          - listitem [ref=e514]:
            - generic [ref=e515]: ውሎች
          - listitem [ref=e516]:
            - generic [ref=e517]: ግላዊነት
    - paragraph [ref=e519]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).
