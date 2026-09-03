# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33747587966
- Commit: `b5a2635ed0a5d1b7825a8bc2673a35f41257d594`
- Attempt: 2
- Written (UTC): 2026-09-03T11:24:09.441Z
- Passed: 397 · Skipped: 71 · Failed: 8
- Gating failures: 8 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-roles.spec.ts › U2 roles console › RP-5 delete guards: members block deletion; typed confirm deletes — Error: expect(locator).toBeVisible() failed

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-2 fake generate produces three assets and updates the row

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-2-fake-generate-produces-three-assets-and-updates-the-row-mobile-360`

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-3 suggest-icon returns an allowlisted value

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 502
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-3-suggest-icon-returns-an-allowlisted-value-mobile-360`

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-2 fake generate produces three assets and updates the row

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-2-fake-generate-produces-three-assets-and-updates-the-row-desktop-1280`

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-3 suggest-icon returns an allowlisted value

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 502
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-3-suggest-icon-returns-an-allowlisted-value-desktop-1280`

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-2 fake generate produces three assets and updates the row

- Source: `changed`
- Project: `mobile-360`

```text
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-2-fake-generate-produces-three-assets-and-updates-the-row-mobile-360`

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-3 suggest-icon returns an allowlisted value

- Source: `changed`
- Project: `mobile-360`

```text
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 502
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-3-suggest-icon-returns-an-allowlisted-value-mobile-360`

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-2 fake generate produces three assets and updates the row

- Source: `changed`
- Project: `desktop-1280`

```text
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-2-fake-generate-produces-three-assets-and-updates-the-row-desktop-1280`

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-3 suggest-icon returns an allowlisted value

- Source: `changed`
- Project: `desktop-1280`

```text
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 502
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-3-suggest-icon-returns-an-allowlisted-value-desktop-1280`

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/categories/generate-image Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud. ×2
[WebServer] [ssr-error] /api/admin/categories/suggest-icon GEMINI_API_KEY is not configured ×2
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/categories/generate-image Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud. ×2
[WebServer] [ssr-error] /api/admin/categories/suggest-icon GEMINI_API_KEY is not configured ×2
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] /api/admin/categories/generate-image Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud. ×4
[WebServer] [ssr-error] /api/admin/categories/suggest-icon GEMINI_API_KEY is not configured ×4
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
