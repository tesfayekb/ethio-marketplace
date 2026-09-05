# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33958167471
- Commit: `f3ab5a42b7812570f602f87024e11d350aad2a6c`
- Attempt: 2
- Written (UTC): 2026-09-05T10:47:51.124Z
- Passed: 511 · Skipped: 74 · Failed: 7
- Gating failures: 7 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 11
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · auth-signout.spec.ts › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin — TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves — Error: expect(received).toBeLessThan(expected)
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-translations.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `changed` · admin-categories.spec.ts › C2 categories console › CT-15 reorder: Move up flips the order with no step-up, catch-all last — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home — Error: expect(locator).toHaveCount(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-categories.spec.ts › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll — Error: window target at 1024
- FLAKY (passed on retry) · `mobile-360` · source `changed` · admin-roles.spec.ts › U2 roles console › RP-8 Amharic + no horizontal overflow — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `changed` · admin-roles.spec.ts › U2 roles console › RP-10 members link preselects the role filter via the URL — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `changed` · admin-roles.spec.ts › U2 roles console › RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `changed` · admin-translations.spec.ts › U4b translations console › TR-3 the strings page lists keys with source and status — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `changed` · admin-translations.spec.ts › U4b translations console › TR-7 sync imports the compiled catalog and reports its counts — Error: expect(locator).toBeVisible() failed

## admin-categories.spec.ts › C2 categories console › CT-17 create flow: two steps, chained countries + position, image

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
      - generic [ref=e37]:
        - generic [ref=e38]: Visible until
        - textbox "Visible until" [ref=e39]
      - generic [ref=e40]:
        - generic [ref=e41]: Hide in countries
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "ET — Ethiopia" [ref=e44] [cursor=pointer]
            - generic [ref=e45]: ET — Ethiopia
          - generic [ref=e46]:
            - checkbox "US — United States" [ref=e47] [cursor=pointer]
            - generic [ref=e48]: US — United States
        - paragraph [ref=e49]: The category stays hidden in every country you tick; you can change this later.
      - generic [ref=e50]:
        - button "Cancel" [ref=e51] [cursor=pointer]
        - button "Save" [ref=e52] [cursor=pointer]
    - button "Close" [ref=e53] [cursor=pointer]:
      - img [ref=e54]
      - generic [ref=e57]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-17 create flow: two steps, chained countries + position, image

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
      - generic [ref=e37]:
        - generic [ref=e38]: Visible until
        - textbox "Visible until" [ref=e39]
      - generic [ref=e40]:
        - generic [ref=e41]: Hide in countries
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "ET — Ethiopia" [ref=e44] [cursor=pointer]
            - generic [ref=e45]: ET — Ethiopia
          - generic [ref=e46]:
            - checkbox "US — United States" [ref=e47] [cursor=pointer]
            - generic [ref=e48]: US — United States
        - paragraph [ref=e49]: The category stays hidden in every country you tick; you can change this later.
      - generic [ref=e50]:
        - button "Cancel" [ref=e51] [cursor=pointer]
        - button "Save" [ref=e52] [cursor=pointer]
    - button "Close" [ref=e53] [cursor=pointer]:
      - img [ref=e54]
      - generic [ref=e57]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e101]:
            - generic [ref=e102]: About
          - listitem [ref=e103]:
            - generic [ref=e104]: How it works
      - navigation "Help" [ref=e105]:
        - heading "Help" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Safety
          - listitem [ref=e110]:
            - generic [ref=e111]: Contact
      - navigation "Legal" [ref=e112]:
        - heading "Legal" [level=2] [ref=e113]
        - list [ref=e114]:
          - listitem [ref=e115]:
            - generic [ref=e116]: Terms
          - listitem [ref=e117]:
            - generic [ref=e118]: Privacy
    - paragraph [ref=e120]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Category image" [ref=e2]:
    - heading "Category image" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Category image
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
        - paragraph [ref=e8]: No image yet for this category.
        - alert [ref=e9]: "Image generation failed (stage: client-timeout): client-timeout"
        - button "Generate image" [ref=e10] [cursor=pointer]
      - button "Close" [ref=e12] [cursor=pointer]
    - button "Close" [ref=e13] [cursor=pointer]:
      - img [ref=e14]
      - generic [ref=e17]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-17 create flow: two steps, chained countries + position, image

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
      - generic [ref=e37]:
        - generic [ref=e38]: Visible until
        - textbox "Visible until" [ref=e39]
      - generic [ref=e40]:
        - generic [ref=e41]: Hide in countries
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "ET — Ethiopia" [ref=e44] [cursor=pointer]
            - generic [ref=e45]: ET — Ethiopia
          - generic [ref=e46]:
            - checkbox "US — United States" [ref=e47] [cursor=pointer]
            - generic [ref=e48]: US — United States
        - paragraph [ref=e49]: The category stays hidden in every country you tick; you can change this later.
      - generic [ref=e50]:
        - button "Cancel" [ref=e51] [cursor=pointer]
        - button "Save" [ref=e52] [cursor=pointer]
    - button "Close" [ref=e53] [cursor=pointer]:
      - img [ref=e54]
      - generic [ref=e57]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-17 create flow: two steps, chained countries + position, image

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
      - generic [ref=e37]:
        - generic [ref=e38]: Visible until
        - textbox "Visible until" [ref=e39]
      - generic [ref=e40]:
        - generic [ref=e41]: Hide in countries
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "ET — Ethiopia" [ref=e44] [cursor=pointer]
            - generic [ref=e45]: ET — Ethiopia
          - generic [ref=e46]:
            - checkbox "US — United States" [ref=e47] [cursor=pointer]
            - generic [ref=e48]: US — United States
        - paragraph [ref=e49]: The category stays hidden in every country you tick; you can change this later.
      - generic [ref=e50]:
        - button "Cancel" [ref=e51] [cursor=pointer]
        - button "Save" [ref=e52] [cursor=pointer]
    - button "Close" [ref=e53] [cursor=pointer]:
      - img [ref=e54]
      - generic [ref=e57]: Close
```
```

## admin-translations.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e506]:
            - generic [ref=e507]: About
          - listitem [ref=e508]:
            - generic [ref=e509]: How it works
      - navigation "Help" [ref=e510]:
        - heading "Help" [level=2] [ref=e511]
        - list [ref=e512]:
          - listitem [ref=e513]:
            - generic [ref=e514]: Safety
          - listitem [ref=e515]:
            - generic [ref=e516]: Contact
      - navigation "Legal" [ref=e517]:
        - heading "Legal" [level=2] [ref=e518]
        - list [ref=e519]:
          - listitem [ref=e520]:
            - generic [ref=e521]: Terms
          - listitem [ref=e522]:
            - generic [ref=e523]: Privacy
    - paragraph [ref=e525]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: changed

```text
[client-error] console.error: Failed to load resource: net::ERR_CONNECTION_CLOSED
[client-error] console.error: Failed to load resource: the server responded with a status of 422 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_sync_ui_keys ({"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_translation_stats ({"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"})
```
