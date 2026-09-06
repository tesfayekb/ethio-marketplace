# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34016100364
- Commit: `b0cadd12159dfc72dca9cb762dbfc164f8c2d951`
- Attempt: 1
- Written (UTC): 2026-09-06T06:31:57.896Z
- Passed: 443 · Skipped: 75 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 7
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › app shell › the feed body is centred with equal left and right gutters — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-roles.spec.ts › U2 roles console › RP-2 create: a super admin creates a custom role through step-up — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-translations-console.spec.ts › U4b translations console › TR-2 roster shows every language including admin-only ones — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-lifecycle.spec.ts › C2 categories console › CT-13 lifecycle: a typed-slug delete removes the row and its dependents — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the marketplace shell renders no English fallback — Error: marketplace rail categories: category labels still in English
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-categories-console.spec.ts › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-categories-console.spec.ts › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths — Error: expect(locator).toBeVisible() failed

## admin-attributes.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete

expect(locator).toContainText(expected) failed

Locator: getByTestId('attribute-delete-blast')
Expected substring: "1"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete with timeout 20000ms
  - waiting for getByTestId('attribute-delete-blast')

```

Context:

```text
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Delete attribute" [active] [ref=e2]:
    - heading "Delete attribute" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Delete attribute
      - paragraph [ref=e6]: The definition disappears from the library. Categories that use it must be unlinked first.
      - generic [ref=e7]:
        - generic [ref=e8]: Type e2e_attr_zyv3vd to confirm
        - textbox "Type e2e_attr_zyv3vd to confirm" [ref=e9]: e2e_attr_zyv3vd
      - alert [ref=e10]: The change could not be saved.
      - generic [ref=e11]:
        - button "Cancel" [ref=e12] [cursor=pointer]
        - button "Delete" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete

expect(locator).toContainText(expected) failed

Locator: getByTestId('attribute-delete-blast')
Expected substring: "1"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete with timeout 20000ms
  - waiting for getByTestId('attribute-delete-blast')

```

Context:

```text
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Delete attribute" [active] [ref=e2]:
    - heading "Delete attribute" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Delete attribute
      - paragraph [ref=e6]: The definition disappears from the library. Categories that use it must be unlinked first.
      - generic [ref=e7]:
        - generic [ref=e8]: Type e2e_attr_juzyz9 to confirm
        - textbox "Type e2e_attr_juzyz9 to confirm" [ref=e9]: e2e_attr_juzyz9
      - alert [ref=e10]: The change could not be saved.
      - generic [ref=e11]:
        - button "Cancel" [ref=e12] [cursor=pointer]
        - button "Delete" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked

- Source: `changed`
- Project: `mobile-360`

```text
Error: [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete

expect(locator).toContainText(expected) failed

Locator: getByTestId('attribute-delete-blast')
Expected substring: "1"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete with timeout 20000ms
  - waiting for getByTestId('attribute-delete-blast')

```

Context:

```text
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Delete attribute" [active] [ref=e2]:
    - heading "Delete attribute" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Delete attribute
      - paragraph [ref=e6]: The definition disappears from the library. Categories that use it must be unlinked first.
      - generic [ref=e7]:
        - generic [ref=e8]: Type e2e_attr_zyv3vd to confirm
        - textbox "Type e2e_attr_zyv3vd to confirm" [ref=e9]: e2e_attr_zyv3vd
      - alert [ref=e10]: The change could not be saved.
      - generic [ref=e11]:
        - button "Cancel" [ref=e12] [cursor=pointer]
        - button "Delete" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete

expect(locator).toContainText(expected) failed

Locator: getByTestId('attribute-delete-blast')
Expected substring: "1"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete with timeout 20000ms
  - waiting for getByTestId('attribute-delete-blast')

```

Context:

```text
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Delete attribute" [active] [ref=e2]:
    - heading "Delete attribute" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Delete attribute
      - paragraph [ref=e6]: The definition disappears from the library. Categories that use it must be unlinked first.
      - generic [ref=e7]:
        - generic [ref=e8]: Type e2e_attr_juzyz9 to confirm
        - textbox "Type e2e_attr_juzyz9 to confirm" [ref=e9]: e2e_attr_juzyz9
      - alert [ref=e10]: The change could not be saved.
      - generic [ref=e11]:
        - button "Cancel" [ref=e12] [cursor=pointer]
        - button "Delete" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
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
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/factors/0dd5b718-8608-4215-8b69-34516d5842ab/challenge ({"code":"unexpected_failure","message":"Unexpected failure, please check server logs for more information"})
```
