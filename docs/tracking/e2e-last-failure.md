# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33749855148
- Commit: `33ba860c482b66c4b4032f625580dd9d511f07e1`
- Attempt: 1
- Written (UTC): 2026-09-03T11:40:16.382Z
- Passed: 401 · Skipped: 72 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

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

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/categories/generate-image image_generate_failed Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud.
[WebServer] [ssr-error] /api/admin/categories/generate-image Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud.
[WebServer] [ssr-error] /api/admin/categories/generate-image image_generate_failed Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud.
[WebServer] [ssr-error] /api/admin/categories/generate-image Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud.
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/categories/generate-image image_generate_failed Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud.
[WebServer] [ssr-error] /api/admin/categories/generate-image Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud.
[WebServer] [ssr-error] /api/admin/categories/generate-image image_generate_failed Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud.
[WebServer] [ssr-error] /api/admin/categories/generate-image Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud.
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] /api/admin/categories/generate-image image_generate_failed Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud.
[WebServer] [ssr-error] /api/admin/categories/generate-image Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud.
[WebServer] [ssr-error] /api/admin/categories/generate-image image_generate_failed Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud.
[WebServer] [ssr-error] /api/admin/categories/generate-image Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud.
[WebServer] [ssr-error] /api/admin/categories/generate-image image_generate_failed Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud.
[WebServer] [ssr-error] /api/admin/categories/generate-image Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud.
[WebServer] [ssr-error] /api/admin/categories/generate-image image_generate_failed Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud.
[WebServer] [ssr-error] /api/admin/categories/generate-image Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud.
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
