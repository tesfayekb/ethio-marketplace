# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34015466485
- Commit: `3a2091d0dcd07bd6f6c7c99537cf9fc827f7f0a7`
- Attempt: 1
- Written (UTC): 2026-09-06T06:13:14.444Z
- Passed: 446 · Skipped: 76 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 3
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-console.spec.ts › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll — Error: window target at 1024
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-console.spec.ts › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-categories-console.spec.ts › C2 categories console › CT-3 create + edit: a scratch category is born and renamed through step-up — Error: expect(locator).toBeVisible() failed

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
        - generic [ref=e9]: Type e2e_attr_zqkxxl to confirm
        - textbox "Type e2e_attr_zqkxxl to confirm" [ref=e10]: e2e_attr_zqkxxl
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
        - generic [ref=e9]: Type e2e_attr_dcwpqz to confirm
        - textbox "Type e2e_attr_dcwpqz to confirm" [ref=e10]: e2e_attr_dcwpqz
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
        - generic [ref=e9]: Type e2e_attr_zqkxxl to confirm
        - textbox "Type e2e_attr_zqkxxl to confirm" [ref=e10]: e2e_attr_zqkxxl
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
        - generic [ref=e9]: Type e2e_attr_dcwpqz to confirm
        - textbox "Type e2e_attr_dcwpqz to confirm" [ref=e10]: e2e_attr_dcwpqz
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
