# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34014787461
- Commit: `efa985bfee4dd0e41ef8bfa0eb3f6555f3e1ce8b`
- Attempt: 1
- Written (UTC): 2026-09-06T05:57:24.080Z
- Passed: 451 · Skipped: 72 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-console.spec.ts › C2 categories console › CT-7 step-up: the server refuses the write until AAL2 is proven — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-categories-console.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth — Error: expect(locator).toBeVisible() failed

## admin-attributes.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('attribute-dialog-error')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('attribute-dialog-error')
    14 × locator resolved to 1 element
       - unexpected value "1"

```

Context:

```text
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Delete attribute" [ref=e2]:
    - heading "Delete attribute" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Delete attribute
      - paragraph [ref=e6]: The definition disappears from the library. Categories that use it must be unlinked first.
      - status [ref=e7]: 1 categories still use this attribute.
      - generic [ref=e8]:
        - generic [ref=e9]: Type e2e_attr_53ufdr to confirm
        - textbox "Type e2e_attr_53ufdr to confirm" [ref=e10]: e2e_attr_53ufdr
      - alert [ref=e11]: The change could not be saved.
      - generic [ref=e12]:
        - button "Cancel" [ref=e13] [cursor=pointer]
        - button "Delete" [ref=e14] [cursor=pointer]
    - button "Close" [ref=e15] [cursor=pointer]:
      - img [ref=e16]
      - generic [ref=e19]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('attribute-dialog-error')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('attribute-dialog-error')
    14 × locator resolved to 1 element
       - unexpected value "1"

```

Context:

```text
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Delete attribute" [ref=e2]:
    - heading "Delete attribute" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Delete attribute
      - paragraph [ref=e6]: The definition disappears from the library. Categories that use it must be unlinked first.
      - status [ref=e7]: 1 categories still use this attribute.
      - generic [ref=e8]:
        - generic [ref=e9]: Type e2e_attr_7e6xp0 to confirm
        - textbox "Type e2e_attr_7e6xp0 to confirm" [ref=e10]: e2e_attr_7e6xp0
      - alert [ref=e11]: The change could not be saved.
      - generic [ref=e12]:
        - button "Cancel" [ref=e13] [cursor=pointer]
        - button "Delete" [ref=e14] [cursor=pointer]
    - button "Close" [ref=e15] [cursor=pointer]:
      - img [ref=e16]
      - generic [ref=e19]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('attribute-dialog-error')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('attribute-dialog-error')
    14 × locator resolved to 1 element
       - unexpected value "1"

```

Context:

```text
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Delete attribute" [ref=e2]:
    - heading "Delete attribute" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Delete attribute
      - paragraph [ref=e6]: The definition disappears from the library. Categories that use it must be unlinked first.
      - status [ref=e7]: 1 categories still use this attribute.
      - generic [ref=e8]:
        - generic [ref=e9]: Type e2e_attr_53ufdr to confirm
        - textbox "Type e2e_attr_53ufdr to confirm" [ref=e10]: e2e_attr_53ufdr
      - alert [ref=e11]: The change could not be saved.
      - generic [ref=e12]:
        - button "Cancel" [ref=e13] [cursor=pointer]
        - button "Delete" [ref=e14] [cursor=pointer]
    - button "Close" [ref=e15] [cursor=pointer]:
      - img [ref=e16]
      - generic [ref=e19]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('attribute-dialog-error')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('attribute-dialog-error')
    14 × locator resolved to 1 element
       - unexpected value "1"

```

Context:

```text
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Delete attribute" [ref=e2]:
    - heading "Delete attribute" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Delete attribute
      - paragraph [ref=e6]: The definition disappears from the library. Categories that use it must be unlinked first.
      - status [ref=e7]: 1 categories still use this attribute.
      - generic [ref=e8]:
        - generic [ref=e9]: Type e2e_attr_7e6xp0 to confirm
        - textbox "Type e2e_attr_7e6xp0 to confirm" [ref=e10]: e2e_attr_7e6xp0
      - alert [ref=e11]: The change could not be saved.
      - generic [ref=e12]:
        - button "Cancel" [ref=e13] [cursor=pointer]
        - button "Delete" [ref=e14] [cursor=pointer]
    - button "Close" [ref=e15] [cursor=pointer]:
      - img [ref=e16]
      - generic [ref=e19]: Close
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_delete_attribute ({"code":"P0010","details":null,"hint":null,"message":"admin.attributes.error.deleteHasLinks:1"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_delete_attribute ({"code":"P0010","details":null,"hint":null,"message":"admin.attributes.error.deleteHasLinks:1"})
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_delete_attribute ({"code":"P0010","details":null,"hint":null,"message":"admin.attributes.error.deleteHasLinks:1"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_delete_attribute ({"code":"P0010","details":null,"hint":null,"message":"admin.attributes.error.deleteHasLinks:1"})
```

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: changed

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_delete_attribute ({"code":"P0010","details":null,"hint":null,"message":"admin.attributes.error.deleteHasLinks:1"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_delete_attribute ({"code":"P0010","details":null,"hint":null,"message":"admin.attributes.error.deleteHasLinks:1"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_delete_attribute ({"code":"P0010","details":null,"hint":null,"message":"admin.attributes.error.deleteHasLinks:1"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_delete_attribute ({"code":"P0010","details":null,"hint":null,"message":"admin.attributes.error.deleteHasLinks:1"})
```
