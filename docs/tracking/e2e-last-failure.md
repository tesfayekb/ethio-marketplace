# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37544308240
- Commit: `e83cc895e4b0b812b17eec3921c6ab0cf0f62df8`
- Attempt: 1
- Written (UTC): 2026-10-06T23:28:17.676Z
- Passed: 1252 · Skipped: 76 · Failed: 8
- Gating failures: 8 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

104 line(s), 34 message(s): 1 off the allowlist, 33 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 3, shard 5, shard 6 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 4 |
| `countries badHeader` (quiet) | 2 | shard 2, shard 5 |
| `countries nulByte` (quiet) | 2 | shard 2, shard 5 |
| `countries tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `countries unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `countries wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `links unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations badHeader` (quiet) | 2 | shard 2, shard 5 |
| `locations file too large` (quiet) | 2 | shard 2, shard 5 |
| `locations nulByte` (quiet) | 2 | shard 2, shard 5 |
| `locations unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 3, shard 5, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-06T23:05:32.152Z | 12.9 min |
| email | 2026-10-06T23:05:35.299Z | 0.2 min |
| shard 1 | 2026-10-06T23:05:32.075Z | 22.5 min |
| shard 2 | 2026-10-06T23:05:48.862Z | 21.3 min |
| shard 3 | 2026-10-06T23:05:31.069Z | 16.9 min |
| shard 4 | 2026-10-06T23:05:34.410Z | 21.7 min |
| shard 5 | 2026-10-06T23:05:31.386Z | 19.7 min |
| shard 6 | 2026-10-06T23:05:38.582Z | 19.1 min |
| changed | 2026-10-06T23:05:27.473Z | 2.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 22.0 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 16.2 min | shard 2, shard 5 |
| `shell.spec.ts` | 252 | 16.1 min | smoke, shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 32 | 11.4 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 42 | 10.9 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 46 | 10.3 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 24 | 10.2 min | shard 3, shard 6, changed |
| `admin-attributes-library.spec.ts` | 40 | 10.0 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 9.8 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 9.5 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 8.8 min | smoke, shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 8.6 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 28 | 8.6 min | shard 3, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 8.3 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 8.1 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 7.5 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.5 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 36 | 6.2 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 5.8 min | shard 2, shard 5 |
| `import-security.spec.ts` | 34 | 5.7 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.5 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 5.5 min | shard 1, shard 5 |
| `admin-roles.spec.ts` | 24 | 5.0 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 3.3 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 2.9 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 2.8 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.8 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 6 | 1.7 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.5 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.5 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `post-wizard-units.spec.ts` | 2 | 0.4 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `posting-routes-catalog.spec.ts` › PR-37 coverage first appearance is stored once, renumbered in either order | desktop-1280 | 49.2 s |
| `posting-routes-catalog.spec.ts` › PR-37 coverage first appearance is stored once, renumbered in either order | desktop-1280 | 48.7 s |
| `posting-routes-catalog.spec.ts` › PR-37 coverage first appearance is stored once, renumbered in either order | mobile-360 | 47.8 s |
| `posting-routes-catalog.spec.ts` › PR-38 owner's client cannot insert, update or delete coverage; the route can | mobile-360 | 46.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 45.3 s |
| `posting-routes-catalog.spec.ts` › PR-38 owner's client cannot insert, update or delete coverage; the route can | desktop-1280 | 45.1 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 45.0 s |
| `posting-routes-catalog.spec.ts` › PR-38 owner's client cannot insert, update or delete coverage; the route can | desktop-1280 | 44.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 43.1 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 42.9 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 41.6 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 39.9 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | desktop-1280 | 37.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 36.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 36.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37544308240-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37544308240-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 5, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 37544308240-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 37544308240-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 5, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37544308240-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 5, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37544308240-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 37544308240-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37544308240-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37544308240-changed
```

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-37 coverage first appearance is stored once, renumbered in either order

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"coverage","detail":"2","reason":"coverageExceedsPlan:city"},{"field":"coverage","detail":"2","reason":"coverageExceedsPlan:region"},{"field":"alias","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"coverage","detail":"2","reason":"coverageExceedsPlan:city"},{"field":"coverage","detail":"2","reason":"coverageExceedsPlan:region"},{"field":"alias","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  231 |     ]) {
  232 |       const answer = await save(page, token, { ...draft, listingId: id, coverage: order });
> 233 |       expect(answer["ok"], JSON.stringify(answer)).toBe(true);
      |                                                    ^
  234 |       id = String(answer["listing_id"]);
  235 |       expect(
  236 |         (await storedPlaces(id)).map(({ location_id, position }) => ({ location_id, position })),
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:233:52
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-38 owner's client cannot insert, update or delete coverage; the route can

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"alias","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"alias","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  273 |     const { token, a, b, draft } = await placeDraft(page);
  274 |     const first = await save(page, token, draft);
> 275 |     expect(first["ok"], JSON.stringify(first)).toBe(true);
      |                                                ^
  276 |     const id = String(first["listing_id"]);
  277 |     const row = (await storedPlaces(id))[0]!;
  278 |     const userClient = createClient(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:275:48
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-37 coverage first appearance is stored once, renumbered in either order

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"coverage","detail":"2","reason":"coverageExceedsPlan:city"},{"field":"coverage","detail":"2","reason":"coverageExceedsPlan:region"},{"field":"alias","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"coverage","detail":"2","reason":"coverageExceedsPlan:city"},{"field":"coverage","detail":"2","reason":"coverageExceedsPlan:region"},{"field":"alias","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  231 |     ]) {
  232 |       const answer = await save(page, token, { ...draft, listingId: id, coverage: order });
> 233 |       expect(answer["ok"], JSON.stringify(answer)).toBe(true);
      |                                                    ^
  234 |       id = String(answer["listing_id"]);
  235 |       expect(
  236 |         (await storedPlaces(id)).map(({ location_id, position }) => ({ location_id, position })),
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:233:52
```

Context:

```text
          - listitem [ref=e292]:
            - generic [ref=e293]: About
          - listitem [ref=e294]:
            - generic [ref=e295]: How it works
      - navigation "Help" [ref=e296]:
        - heading "Help" [level=2] [ref=e297]
        - list [ref=e298]:
          - listitem [ref=e299]:
            - generic [ref=e300]: Safety
          - listitem [ref=e301]:
            - generic [ref=e302]: Contact
      - navigation "Legal" [ref=e303]:
        - heading "Legal" [level=2] [ref=e304]
        - list [ref=e305]:
          - listitem [ref=e306]:
            - generic [ref=e307]: Terms
          - listitem [ref=e308]:
            - generic [ref=e309]: Privacy
    - paragraph [ref=e311]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-38 owner's client cannot insert, update or delete coverage; the route can

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"alias","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"alias","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  273 |     const { token, a, b, draft } = await placeDraft(page);
  274 |     const first = await save(page, token, draft);
> 275 |     expect(first["ok"], JSON.stringify(first)).toBe(true);
      |                                                ^
  276 |     const id = String(first["listing_id"]);
  277 |     const row = (await storedPlaces(id))[0]!;
  278 |     const userClient = createClient(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:275:48
```

Context:

```text
          - listitem [ref=e286]:
            - generic [ref=e287]: About
          - listitem [ref=e288]:
            - generic [ref=e289]: How it works
      - navigation "Help" [ref=e290]:
        - heading "Help" [level=2] [ref=e291]
        - list [ref=e292]:
          - listitem [ref=e293]:
            - generic [ref=e294]: Safety
          - listitem [ref=e295]:
            - generic [ref=e296]: Contact
      - navigation "Legal" [ref=e297]:
        - heading "Legal" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - generic [ref=e301]: Terms
          - listitem [ref=e302]:
            - generic [ref=e303]: Privacy
    - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-37 coverage first appearance is stored once, renumbered in either order

- Source: `changed`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"coverage","detail":"2","reason":"coverageExceedsPlan:city"},{"field":"coverage","detail":"2","reason":"coverageExceedsPlan:region"},{"field":"alias","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"coverage","detail":"2","reason":"coverageExceedsPlan:city"},{"field":"coverage","detail":"2","reason":"coverageExceedsPlan:region"},{"field":"alias","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  231 |     ]) {
  232 |       const answer = await save(page, token, { ...draft, listingId: id, coverage: order });
> 233 |       expect(answer["ok"], JSON.stringify(answer)).toBe(true);
      |                                                    ^
  234 |       id = String(answer["listing_id"]);
  235 |       expect(
  236 |         (await storedPlaces(id)).map(({ location_id, position }) => ({ location_id, position })),
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:233:52
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-38 owner's client cannot insert, update or delete coverage; the route can

- Source: `changed`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"alias","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"alias","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  273 |     const { token, a, b, draft } = await placeDraft(page);
  274 |     const first = await save(page, token, draft);
> 275 |     expect(first["ok"], JSON.stringify(first)).toBe(true);
      |                                                ^
  276 |     const id = String(first["listing_id"]);
  277 |     const row = (await storedPlaces(id))[0]!;
  278 |     const userClient = createClient(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:275:48
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-37 coverage first appearance is stored once, renumbered in either order

- Source: `changed`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"coverage","detail":"2","reason":"coverageExceedsPlan:city"},{"field":"coverage","detail":"2","reason":"coverageExceedsPlan:region"},{"field":"alias","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"coverage","detail":"2","reason":"coverageExceedsPlan:city"},{"field":"coverage","detail":"2","reason":"coverageExceedsPlan:region"},{"field":"alias","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  231 |     ]) {
  232 |       const answer = await save(page, token, { ...draft, listingId: id, coverage: order });
> 233 |       expect(answer["ok"], JSON.stringify(answer)).toBe(true);
      |                                                    ^
  234 |       id = String(answer["listing_id"]);
  235 |       expect(
  236 |         (await storedPlaces(id)).map(({ location_id, position }) => ({ location_id, position })),
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:233:52
```

Context:

```text
          - listitem [ref=e292]:
            - generic [ref=e293]: About
          - listitem [ref=e294]:
            - generic [ref=e295]: How it works
      - navigation "Help" [ref=e296]:
        - heading "Help" [level=2] [ref=e297]
        - list [ref=e298]:
          - listitem [ref=e299]:
            - generic [ref=e300]: Safety
          - listitem [ref=e301]:
            - generic [ref=e302]: Contact
      - navigation "Legal" [ref=e303]:
        - heading "Legal" [level=2] [ref=e304]
        - list [ref=e305]:
          - listitem [ref=e306]:
            - generic [ref=e307]: Terms
          - listitem [ref=e308]:
            - generic [ref=e309]: Privacy
    - paragraph [ref=e311]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-38 owner's client cannot insert, update or delete coverage; the route can

- Source: `changed`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"alias","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"alias","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  273 |     const { token, a, b, draft } = await placeDraft(page);
  274 |     const first = await save(page, token, draft);
> 275 |     expect(first["ok"], JSON.stringify(first)).toBe(true);
      |                                                ^
  276 |     const id = String(first["listing_id"]);
  277 |     const row = (await storedPlaces(id))[0]!;
  278 |     const userClient = createClient(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:275:48
```

Context:

```text
          - listitem [ref=e286]:
            - generic [ref=e287]: About
          - listitem [ref=e288]:
            - generic [ref=e289]: How it works
      - navigation "Help" [ref=e290]:
        - heading "Help" [level=2] [ref=e291]
        - list [ref=e292]:
          - listitem [ref=e293]:
            - generic [ref=e294]: Safety
          - listitem [ref=e295]:
            - generic [ref=e296]: Contact
      - navigation "Legal" [ref=e297]:
        - heading "Legal" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - generic [ref=e301]: Terms
          - listitem [ref=e302]:
            - generic [ref=e303]: Privacy
    - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 6

```text
[client-error] console.error: [client-error] gate fetch threw
console.error: [client-error] gate fetch threw
```

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
