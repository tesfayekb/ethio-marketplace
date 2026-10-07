# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37552409318
- Commit: `e54743dcb05a95ffaa5335cc3161d71c65586b78`
- Attempt: 1
- Written (UTC): 2026-10-07T00:57:28.089Z
- Passed: 1256 · Skipped: 76 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

103 line(s), 34 message(s): 1 off the allowlist, 33 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 5 | shard 2, shard 3, shard 6 |
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

- Count: 5 · Sources: shard 2, shard 3, shard 6

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
| smoke | 2026-10-07T00:32:49.541Z | 13.1 min |
| email | 2026-10-07T00:32:52.549Z | 0.2 min |
| shard 1 | 2026-10-07T00:32:51.195Z | 24.3 min |
| shard 2 | 2026-10-07T00:32:50.857Z | 19.1 min |
| shard 3 | 2026-10-07T00:32:46.435Z | 16.7 min |
| shard 4 | 2026-10-07T00:32:44.691Z | 19.8 min |
| shard 5 | 2026-10-07T00:32:42.939Z | 19.7 min |
| shard 6 | 2026-10-07T00:33:06.733Z | 20.1 min |
| changed | 2026-10-07T00:32:55.232Z | 3.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 23.3 min | shard 3, shard 6 |
| `shell.spec.ts` | 252 | 16.5 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 14.8 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 32 | 12.1 min | shard 3, shard 6 |
| `posting-routes-catalog.spec.ts` | 24 | 10.4 min | shard 3, shard 6, changed |
| `post-wizard-category.spec.ts` | 42 | 10.0 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 46 | 10.0 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 40 | 9.9 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 9.7 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 9.5 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 8.9 min | smoke, shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 28 | 8.7 min | shard 3, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 8.4 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 8.3 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 50 | 8.2 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 7.4 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 7.4 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 36 | 6.3 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 5.8 min | shard 1, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.3 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.3 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 5.0 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 24 | 5.0 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 3.1 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 3.0 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 2.8 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.3 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 6 | 1.6 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 14 | 1.5 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 2 | 0.6 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `post-wizard-units.spec.ts` | 2 | 0.5 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `posting-routes-catalog.spec.ts` › PR-37 coverage first appearance is stored once, renumbered in either order | desktop-1280 | 50.1 s |
| `posting-routes-catalog.spec.ts` › PR-37 coverage first appearance is stored once, renumbered in either order | mobile-360 | 47.6 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 47.3 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 47.1 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 44.7 s |
| `admin-audit.spec.ts` › IMP-3 server refusals: self, super-admin target, and a non-super caller | mobile-360 | 43.7 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 43.7 s |
| `posting-routes-catalog.spec.ts` › PR-37 coverage first appearance is stored once, renumbered in either order | desktop-1280 | 40.8 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 40.1 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | desktop-1280 | 38.8 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 38.5 s |
| `post-wizard-resets.spec.ts` › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) | desktop-1280 | 38.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 37.7 s |
| `posting-routes-catalog.spec.ts` › PR-37 coverage first appearance is stored once, renumbered in either order | mobile-360 | 37.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 36.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37552409318-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37552409318-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 5, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 37552409318-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 37552409318-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 5, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37552409318-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 5, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37552409318-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 37552409318-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37552409318-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37552409318-changed
```

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-37 coverage first appearance is stored once, renumbered in either order

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:reap] location 9416f929-9681-440c-97f2-cb8afc25720d failed: update or delete on table "locations" violates foreign key constraint "seller_places_location_id_fkey" on table "seller_places"
--- further error 1 ---
Error: [e2e:reap] location 9416f929-9681-440c-97f2-cb8afc25720d failed: update or delete on table "locations" violates foreign key constraint "seller_places_location_id_fkey" on table "seller_places"

   at helpers/locations.ts:250

  248 |     const deleted = await supabase.from("locations").delete().eq("id", id);
  249 |     if (deleted.error)
> 250 |       throw new Error(`[e2e:reap] location ${id} failed: ${deleted.error.message}`);
      |             ^
  251 |   }
  252 | }
  253 |
    at destroyLocation (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:250:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:28:42
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
Error: [e2e:reap] location bb11565b-8759-430c-b5ec-136683c7d0e7 failed: update or delete on table "locations" violates foreign key constraint "seller_places_location_id_fkey" on table "seller_places"
--- further error 1 ---
Error: [e2e:reap] location bb11565b-8759-430c-b5ec-136683c7d0e7 failed: update or delete on table "locations" violates foreign key constraint "seller_places_location_id_fkey" on table "seller_places"

   at helpers/locations.ts:250

  248 |     const deleted = await supabase.from("locations").delete().eq("id", id);
  249 |     if (deleted.error)
> 250 |       throw new Error(`[e2e:reap] location ${id} failed: ${deleted.error.message}`);
      |             ^
  251 |   }
  252 | }
  253 |
    at destroyLocation (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:250:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:28:42
```

Context:

```text
          - listitem [ref=e261]:
            - generic [ref=e262]: About
          - listitem [ref=e263]:
            - generic [ref=e264]: How it works
      - navigation "Help" [ref=e265]:
        - heading "Help" [level=2] [ref=e266]
        - list [ref=e267]:
          - listitem [ref=e268]:
            - generic [ref=e269]: Safety
          - listitem [ref=e270]:
            - generic [ref=e271]: Contact
      - navigation "Legal" [ref=e272]:
        - heading "Legal" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Terms
          - listitem [ref=e277]:
            - generic [ref=e278]: Privacy
    - paragraph [ref=e280]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-37 coverage first appearance is stored once, renumbered in either order

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:reap] location e60147dd-f985-4b82-b734-2a469676a3af failed: update or delete on table "locations" violates foreign key constraint "seller_places_location_id_fkey" on table "seller_places"
--- further error 1 ---
Error: [e2e:reap] location e60147dd-f985-4b82-b734-2a469676a3af failed: update or delete on table "locations" violates foreign key constraint "seller_places_location_id_fkey" on table "seller_places"

   at helpers/locations.ts:250

  248 |     const deleted = await supabase.from("locations").delete().eq("id", id);
  249 |     if (deleted.error)
> 250 |       throw new Error(`[e2e:reap] location ${id} failed: ${deleted.error.message}`);
      |             ^
  251 |   }
  252 | }
  253 |
    at destroyLocation (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:250:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:28:42
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
Error: [e2e:reap] location d3aea565-2f8e-47f0-96a2-969d2aab7694 failed: update or delete on table "locations" violates foreign key constraint "seller_places_location_id_fkey" on table "seller_places"
--- further error 1 ---
Error: [e2e:reap] location d3aea565-2f8e-47f0-96a2-969d2aab7694 failed: update or delete on table "locations" violates foreign key constraint "seller_places_location_id_fkey" on table "seller_places"

   at helpers/locations.ts:250

  248 |     const deleted = await supabase.from("locations").delete().eq("id", id);
  249 |     if (deleted.error)
> 250 |       throw new Error(`[e2e:reap] location ${id} failed: ${deleted.error.message}`);
      |             ^
  251 |   }
  252 | }
  253 |
    at destroyLocation (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:250:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:28:42
```

Context:

```text
          - listitem [ref=e261]:
            - generic [ref=e262]: About
          - listitem [ref=e263]:
            - generic [ref=e264]: How it works
      - navigation "Help" [ref=e265]:
        - heading "Help" [level=2] [ref=e266]
        - list [ref=e267]:
          - listitem [ref=e268]:
            - generic [ref=e269]: Safety
          - listitem [ref=e270]:
            - generic [ref=e271]: Contact
      - navigation "Legal" [ref=e272]:
        - heading "Legal" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Terms
          - listitem [ref=e277]:
            - generic [ref=e278]: Privacy
    - paragraph [ref=e280]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 3

```text
[client-error] console.error: [client-error] gate fetch threw
console.error: [client-error] gate fetch threw
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
