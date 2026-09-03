# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33814295512
- Commit: `6b9380743b6282b223cdc83462f73978acf6b0d3`
- Attempt: 1
- Written (UTC): 2026-09-03T22:57:01.933Z
- Passed: 443 · Skipped: 77 · Failed: 6
- Gating failures: 6 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 3
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-roles.spec.ts › U2 roles console › RP-3 matrix: grant then revoke a benign permission, persisted across reload — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-categories.spec.ts › C2 categories console › CT-13 lifecycle: a typed-slug delete removes the row and its dependents — Error: expect(locator).toBeVisible() failed

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-2 fake generate produces three assets and updates the row

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Create a single flat vector illustration icon for an online marketplace category. Subject: E2E Scratch Basket. Context: it belongs to the marketplace section the marketplace root. Style: flat vector, bold simple geometry, clean even line weight, no gradients, no shadows, no 3D, no photographic texture, no perspective. Palette: primary #1E5A43 (deep green), accent #C98A2B (warm gold); use only these two colours plus their tints, on a pure white background (#FFFFFF). Composition: one centred subject filling about 85% of the square frame, generous even margins, perfectly centred, square 1:1 aspect. Absolutely no text, no letters, no numbers, no watermark, no logo, no border, no frame, no drop shadow, no background scenery."
Received: null
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-2-fake-generate-produces-three-assets-and-updates-the-row-mobile-360`

## admin-categories.spec.ts › C2 categories console › CI-5 bulk fill: the missing-assets run fills every seeded row

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e392]:
            - generic [ref=e393]: About
          - listitem [ref=e394]:
            - generic [ref=e395]: How it works
      - navigation "Help" [ref=e396]:
        - heading "Help" [level=2] [ref=e397]
        - list [ref=e398]:
          - listitem [ref=e399]:
            - generic [ref=e400]: Safety
          - listitem [ref=e401]:
            - generic [ref=e402]: Contact
      - navigation "Legal" [ref=e403]:
        - heading "Legal" [level=2] [ref=e404]
        - list [ref=e405]:
          - listitem [ref=e406]:
            - generic [ref=e407]: Terms
          - listitem [ref=e408]:
            - generic [ref=e409]: Privacy
    - paragraph [ref=e411]: © 2026 ethio.com — All rights reserved.
```
```

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-2 fake generate produces three assets and updates the row

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Create a single flat vector illustration icon for an online marketplace category. Subject: E2E Scratch Basket. Context: it belongs to the marketplace section the marketplace root. Style: flat vector, bold simple geometry, clean even line weight, no gradients, no shadows, no 3D, no photographic texture, no perspective. Palette: primary #1E5A43 (deep green), accent #C98A2B (warm gold); use only these two colours plus their tints, on a pure white background (#FFFFFF). Composition: one centred subject filling about 85% of the square frame, generous even margins, perfectly centred, square 1:1 aspect. Absolutely no text, no letters, no numbers, no watermark, no logo, no border, no frame, no drop shadow, no background scenery."
Received: null
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-2-fake-generate-produces-three-assets-and-updates-the-row-desktop-1280`

## admin-categories.spec.ts › C2 categories console › CI-5 bulk fill: the missing-assets run fills every seeded row

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "3/3"
Received string:    "Generating 0/3"
```

Context:

```text
          - listitem [ref=e392]:
            - generic [ref=e393]: About
          - listitem [ref=e394]:
            - generic [ref=e395]: How it works
      - navigation "Help" [ref=e396]:
        - heading "Help" [level=2] [ref=e397]
        - list [ref=e398]:
          - listitem [ref=e399]:
            - generic [ref=e400]: Safety
          - listitem [ref=e401]:
            - generic [ref=e402]: Contact
      - navigation "Legal" [ref=e403]:
        - heading "Legal" [level=2] [ref=e404]
        - list [ref=e405]:
          - listitem [ref=e406]:
            - generic [ref=e407]: Terms
          - listitem [ref=e408]:
            - generic [ref=e409]: Privacy
    - paragraph [ref=e411]: © 2026 ethio.com — All rights reserved.
```
```

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-2 fake generate produces three assets and updates the row

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Create a single flat vector illustration icon for an online marketplace category. Subject: E2E Scratch Basket. Context: it belongs to the marketplace section the marketplace root. Style: flat vector, bold simple geometry, clean even line weight, no gradients, no shadows, no 3D, no photographic texture, no perspective. Palette: primary #1E5A43 (deep green), accent #C98A2B (warm gold); use only these two colours plus their tints, on a pure white background (#FFFFFF). Composition: one centred subject filling about 85% of the square frame, generous even margins, perfectly centred, square 1:1 aspect. Absolutely no text, no letters, no numbers, no watermark, no logo, no border, no frame, no drop shadow, no background scenery."
Received: null
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-2-fake-generate-produces-three-assets-and-updates-the-row-mobile-360`

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-2 fake generate produces three assets and updates the row

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Create a single flat vector illustration icon for an online marketplace category. Subject: E2E Scratch Basket. Context: it belongs to the marketplace section the marketplace root. Style: flat vector, bold simple geometry, clean even line weight, no gradients, no shadows, no 3D, no photographic texture, no perspective. Palette: primary #1E5A43 (deep green), accent #C98A2B (warm gold); use only these two colours plus their tints, on a pure white background (#FFFFFF). Composition: one centred subject filling about 85% of the square frame, generous even margins, perfectly centred, square 1:1 aspect. Absolutely no text, no letters, no numbers, no watermark, no logo, no border, no frame, no drop shadow, no background scenery."
Received: null
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-2-fake-generate-produces-three-assets-and-updates-the-row-desktop-1280`

## Server errors: shard 2

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/categories/generate-image image_generate_failed stage=persist category not found
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
