# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33958167471
- Commit: `f3ab5a42b7812570f602f87024e11d350aad2a6c`
- Attempt: 1
- Written (UTC): 2026-09-05T09:57:47.456Z
- Passed: 377 · Skipped: 73 · Failed: 11
- Gating failures: 11 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 18
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · auth-signout.spec.ts › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin — TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves — Error: expect(received).toBeLessThan(expected)
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories.spec.ts › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories.spec.ts › C2 categories console › CT-13 lifecycle: a typed-slug delete removes the row and its dependents — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-roles.spec.ts › U2 roles console › RP-2 create: a super admin creates a custom role through step-up — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-roles.spec.ts › U2 roles console › RP-3 matrix: grant then revoke a benign permission, persisted across reload — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-roles.spec.ts › U2 roles console › RP-5 delete guards: members block deletion; typed confirm deletes — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-roles.spec.ts › U2 roles console › RP-6 revocation path: unenrolling the factor refuses the next change — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-roles.spec.ts › U2 roles console › RP-10 members link preselects the role filter via the URL — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-roles.spec.ts › U2 roles console › RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-translations.spec.ts › U4b translations console › TR-7 sync imports the compiled catalog and reports its counts — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories.spec.ts › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories.spec.ts › C2 categories console › CT-15 reorder: Move up flips the order with no step-up, catch-all last — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories.spec.ts › C2 categories console › CT-16 return path: closing a secondary dialog returns to the open editor — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-shell.spec.ts › Admin shell (U0) › A-1 admin fixture: gated section nav, section page + breadcrumb, deep link — Error: expect(page).toHaveURL(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-translations.spec.ts › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication — Error: expect(locator).toBeDisabled() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-translations.spec.ts › U4b translations console › TR-7 sync imports the compiled catalog and reports its counts — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · mfa-stepup.spec.ts › U1f-4 step-up freshness › MF-7 a verification older than the window re-prompts — Test timeout of 60000ms exceeded.

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
        - generic [ref=e40]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e41]:
          - /placeholder: No expiry
      - generic [ref=e42]:
        - checkbox "Accepts listings" [checked] [ref=e43] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e44]:
        - checkbox "Price field enabled" [checked] [ref=e45] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e46]:
        - button "Cancel" [ref=e47] [cursor=pointer]
        - button "Save" [ref=e48] [cursor=pointer]
    - button "Close" [ref=e49] [cursor=pointer]:
      - img [ref=e50]
      - generic [ref=e53]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-15 reorder: Move up flips the order with no step-up, catch-all last

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
        - generic [ref=e38]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e39]:
          - /placeholder: No expiry
      - generic [ref=e40]:
        - checkbox "Accepts listings" [checked] [ref=e41] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e42]:
        - checkbox "Price field enabled" [checked] [ref=e43] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e44]:
        - button "Cancel" [ref=e45] [cursor=pointer]
        - button "Save" [ref=e46] [cursor=pointer]
    - button "Close" [ref=e47] [cursor=pointer]:
      - img [ref=e48]
      - generic [ref=e51]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
      - paragraph [ref=e5]: Category image
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
        - generic [ref=e8]:
          - figure "Card 512" [ref=e9]:
            - img "Card 512" [ref=e10]
            - generic [ref=e11]: Card 512
          - figure "Thumbnail 128" [ref=e12]:
            - img "Thumbnail 128" [ref=e13]
            - generic [ref=e14]: Thumbnail 128
          - figure "Social image 1200x630" [ref=e15]:
            - img "Social image 1200x630" [ref=e16]
            - generic [ref=e17]: Social image 1200x630
        - button "Generating…" [disabled]
      - paragraph [ref=e18]: Accepted · 6 seconds ago
      - button "Close" [ref=e20] [cursor=pointer]
    - button "Close" [ref=e21] [cursor=pointer]:
      - img [ref=e22]
      - generic [ref=e25]: Close
```
```

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

## admin-categories.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e189]:
            - generic [ref=e190]: About
          - listitem [ref=e191]:
            - generic [ref=e192]: How it works
      - navigation "Help" [ref=e193]:
        - heading "Help" [level=2] [ref=e194]
        - list [ref=e195]:
          - listitem [ref=e196]:
            - generic [ref=e197]: Safety
          - listitem [ref=e198]:
            - generic [ref=e199]: Contact
      - navigation "Legal" [ref=e200]:
        - heading "Legal" [level=2] [ref=e201]
        - list [ref=e202]:
          - listitem [ref=e203]:
            - generic [ref=e204]: Terms
          - listitem [ref=e205]:
            - generic [ref=e206]: Privacy
    - paragraph [ref=e208]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
        - generic [ref=e38]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e39]:
          - /placeholder: No expiry
      - generic [ref=e40]:
        - checkbox "Accepts listings" [checked] [ref=e41] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e42]:
        - checkbox "Price field enabled" [checked] [ref=e43] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e44]:
        - button "Cancel" [ref=e45] [cursor=pointer]
        - button "Save" [ref=e46] [cursor=pointer]
    - button "Close" [ref=e47] [cursor=pointer]:
      - img [ref=e48]
      - generic [ref=e51]: Close
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

## admin-roles.spec.ts › U2 roles console › RP-5 delete guards: members block deletion; typed confirm deletes

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e496]:
            - generic [ref=e497]: About
          - listitem [ref=e498]:
            - generic [ref=e499]: How it works
      - navigation "Help" [ref=e500]:
        - heading "Help" [level=2] [ref=e501]
        - list [ref=e502]:
          - listitem [ref=e503]:
            - generic [ref=e504]: Safety
          - listitem [ref=e505]:
            - generic [ref=e506]: Contact
      - navigation "Legal" [ref=e507]:
        - heading "Legal" [level=2] [ref=e508]
        - list [ref=e509]:
          - listitem [ref=e510]:
            - generic [ref=e511]: Terms
          - listitem [ref=e512]:
            - generic [ref=e513]: Privacy
    - paragraph [ref=e515]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-5 filters live in the URL and survive a reload

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('strings-chip-approved')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('strings-chip-approved')

```

Context:

```text
          - listitem [ref=e115]:
            - generic [ref=e116]: About
          - listitem [ref=e117]:
            - generic [ref=e118]: How it works
      - navigation "Help" [ref=e119]:
        - heading "Help" [level=2] [ref=e120]
        - list [ref=e121]:
          - listitem [ref=e122]:
            - generic [ref=e123]: Safety
          - listitem [ref=e124]:
            - generic [ref=e125]: Contact
      - navigation "Legal" [ref=e126]:
        - heading "Legal" [level=2] [ref=e127]
        - list [ref=e128]:
          - listitem [ref=e129]:
            - generic [ref=e130]: Terms
          - listitem [ref=e131]:
            - generic [ref=e132]: Privacy
    - paragraph [ref=e134]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-10 edit: a duplicate alias is refused inline and nothing changes

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('edit-seller-alias')
Expected: ""
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('edit-seller-alias')

```

Context:

```text
          - listitem [ref=e180]:
            - generic [ref=e181]: About
          - listitem [ref=e182]:
            - generic [ref=e183]: How it works
      - navigation "Help" [ref=e184]:
        - heading "Help" [level=2] [ref=e185]
        - list [ref=e186]:
          - listitem [ref=e187]:
            - generic [ref=e188]: Safety
          - listitem [ref=e189]:
            - generic [ref=e190]: Contact
      - navigation "Legal" [ref=e191]:
        - heading "Legal" [level=2] [ref=e192]
        - list [ref=e193]:
          - listitem [ref=e194]:
            - generic [ref=e195]: Terms
          - listitem [ref=e196]:
            - generic [ref=e197]: Privacy
    - paragraph [ref=e199]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e229]:
            - generic [ref=e230]: About
          - listitem [ref=e231]:
            - generic [ref=e232]: How it works
      - navigation "Help" [ref=e233]:
        - heading "Help" [level=2] [ref=e234]
        - list [ref=e235]:
          - listitem [ref=e236]:
            - generic [ref=e237]: Safety
          - listitem [ref=e238]:
            - generic [ref=e239]: Contact
      - navigation "Legal" [ref=e240]:
        - heading "Legal" [level=2] [ref=e241]
        - list [ref=e242]:
          - listitem [ref=e243]:
            - generic [ref=e244]: Terms
          - listitem [ref=e245]:
            - generic [ref=e246]: Privacy
    - paragraph [ref=e248]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/factors/6bbaab53-a87f-4e70-a874-afbf15416391/challenge ({"code":"unexpected_failure","message":"Unexpected failure, please check server logs for more information"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_sync_ui_keys ({"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"})
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-CQeNHrtX.js:13856:39 at getResponse (http://127.0.0.1:4173/assets/index-CQeNHrtX.js:13903:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-CQeNHrtX.js:13856:15) at async client (http://127.0.0.1:4173/assets/index-CQeNHrtX.js:16052:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-CQeNHrtX.js:15983:20) at async userNext (http://127.0.0.1:4173/assets/index-CQeNHrtX.js:15969:21) ×3
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/factors/e6cc2eb0-aa95-471b-9958-d49e840c441f/challenge ({"code":"unexpected_failure","message":"Unexpected failure, please check server logs for more information"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_sync_ui_keys ({"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"})
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 5

```text
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-CQeNHrtX.js:13856:39 at getResponse (http://127.0.0.1:4173/assets/index-CQeNHrtX.js:13903:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-CQeNHrtX.js:13856:15) at async client (http://127.0.0.1:4173/assets/index-CQeNHrtX.js:16052:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-CQeNHrtX.js:15983:20) at async userNext (http://127.0.0.1:4173/assets/index-CQeNHrtX.js:15969:21) ×3
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: Failed to load resource: the server responded with a status of 422 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 409 () ×2
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
```
