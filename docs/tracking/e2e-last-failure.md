# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33738163031
- Commit: `428cab206f492c3690e8fa05688480be02a558f5`
- Attempt: 1
- Written (UTC): 2026-09-03T09:32:33.091Z
- Passed: 441 · Skipped: 76 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 4
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-audit.spec.ts › U3 audit & security › IMP-3 server refusals: self, super-admin target, and a non-super caller — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-users.spec.ts › U1 admin users › AU-4 roles: assign and remove, super_admin/user never offered — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · shell.spec.ts › panel follows the route › admin panel is absent for a normal signed-in user — Error: expect(locator).toContainText(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `changed` · admin-categories.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth — Test timeout of 60000ms exceeded.

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context:

```text
          - option "e2e-cat-changed-38-ox6sdm"
          - option "e2e-cat-changed-4-75etj0"
          - option "e2e-cat-changed-40-4b6k4w"
          - option "e2e-cat-changed-40-jtiemo"
          - option "e2e-cat-changed-5-t7qugv"
          - option "e2e-cat-changed-6-n2jhzw"
          - option "e2e-cat-changed-7-ocgocg"
          - option "e2e-cat-changed-8-q9xjjy"
          - option "e2e-cat-changed-9-gyhh46"
          - option "e2e-cat-4-2-fqzs4l"
          - option "e2e-cat-changed-3-htqopr"
          - option "e2e-cat-changed-2-t27rm7"
      - alert [ref=e10]: The change could not be saved.
      - generic [ref=e11]:
        - button "Cancel" [ref=e12] [cursor=pointer]
        - button "Retire" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - option "e2e-cat-changed-38-ox6sdm"
          - option "e2e-cat-changed-4-75etj0"
          - option "e2e-cat-changed-40-4b6k4w"
          - option "e2e-cat-changed-40-jtiemo"
          - option "e2e-cat-changed-5-t7qugv"
          - option "e2e-cat-changed-6-n2jhzw"
          - option "e2e-cat-changed-7-ocgocg"
          - option "e2e-cat-changed-8-q9xjjy"
          - option "e2e-cat-changed-9-gyhh46"
          - option "e2e-cat-1-1-osox0v"
          - option "e2e-cat-changed-3-htqopr"
          - option "e2e-cat-changed-2-t27rm7"
      - alert [ref=e10]: The change could not be saved.
      - generic [ref=e11]:
        - button "Cancel" [ref=e12] [cursor=pointer]
        - button "Retire" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context:

```text
          - option "e2e-cat-changed-38-ox6sdm"
          - option "e2e-cat-changed-4-75etj0"
          - option "e2e-cat-changed-40-4b6k4w"
          - option "e2e-cat-changed-40-jtiemo"
          - option "e2e-cat-changed-5-t7qugv"
          - option "e2e-cat-changed-6-n2jhzw"
          - option "e2e-cat-changed-7-ocgocg"
          - option "e2e-cat-changed-8-q9xjjy"
          - option "e2e-cat-changed-9-gyhh46"
          - option "e2e-cat-4-2-fqzs4l"
          - option "e2e-cat-changed-3-htqopr"
          - option "e2e-cat-changed-2-t27rm7"
      - alert [ref=e10]: The change could not be saved.
      - generic [ref=e11]:
        - button "Cancel" [ref=e12] [cursor=pointer]
        - button "Retire" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context:

```text
          - option "e2e-cat-changed-38-ox6sdm"
          - option "e2e-cat-changed-4-75etj0"
          - option "e2e-cat-changed-40-4b6k4w"
          - option "e2e-cat-changed-40-jtiemo"
          - option "e2e-cat-changed-5-t7qugv"
          - option "e2e-cat-changed-6-n2jhzw"
          - option "e2e-cat-changed-7-ocgocg"
          - option "e2e-cat-changed-8-q9xjjy"
          - option "e2e-cat-changed-9-gyhh46"
          - option "e2e-cat-1-1-osox0v"
          - option "e2e-cat-changed-3-htqopr"
          - option "e2e-cat-changed-2-t27rm7"
      - alert [ref=e10]: The change could not be saved.
      - generic [ref=e11]:
        - button "Cancel" [ref=e12] [cursor=pointer]
        - button "Retire" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_audit_facets ({"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_retire_category ({"code":"P0010","details":null,"hint":null,"message":"admin.categories.error.reassign_target_invalid"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_retire_category ({"code":"P0010","details":null,"hint":null,"message":"admin.categories.error.reassign_target_invalid"})
```

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_retire_category ({"code":"P0010","details":null,"hint":null,"message":"admin.categories.error.reassign_target_invalid"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_retire_category ({"code":"P0010","details":null,"hint":null,"message":"admin.categories.error.reassign_target_invalid"})
```

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_retire_category ({"code":"P0010","details":null,"hint":null,"message":"admin.categories.error.reassign_target_invalid"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_retire_category ({"code":"P0010","details":null,"hint":null,"message":"admin.categories.error.reassign_target_invalid"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_retire_category ({"code":"P0010","details":null,"hint":null,"message":"admin.categories.error.reassign_target_invalid"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_retire_category ({"code":"P0010","details":null,"hint":null,"message":"admin.categories.error.reassign_target_invalid"})
```
