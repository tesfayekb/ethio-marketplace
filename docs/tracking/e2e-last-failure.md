# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35216455983
- Commit: `b8a02eb7a7bc06766038c09670743a739421e9eb`
- Attempt: 3
- Written (UTC): 2026-09-17T12:18:59.667Z
- Passed: 728 · Skipped: 70 · Failed: 5
- Gating failures: 5 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, shard 2, shard 5
- Sources without results: none

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 38 user(s) owned by process 35216455983-smoke
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 63 user(s) owned by process 35216455983-2
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 61 user(s) owned by process 35216455983-5
```

## shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node

- Source: `smoke`
- Project: `mobile-360`

```text
Test timeout of 180000ms exceeded.
```

Context:

```text
          - listitem [ref=e79]:
            - generic [ref=e80]: About
          - listitem [ref=e81]:
            - generic [ref=e82]: How it works
      - navigation "Help" [ref=e83]:
        - heading "Help" [level=2] [ref=e84]
        - list [ref=e85]:
          - listitem [ref=e86]:
            - generic [ref=e87]: Safety
          - listitem [ref=e88]:
            - generic [ref=e89]: Contact
      - navigation "Legal" [ref=e90]:
        - heading "Legal" [level=2] [ref=e91]
        - list [ref=e92]:
          - listitem [ref=e93]:
            - generic [ref=e94]: Terms
          - listitem [ref=e95]:
            - generic [ref=e96]: Privacy
    - paragraph [ref=e98]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-11 one read per country: filtering costs no request, switching the market costs exactly one

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 3
Received: 2

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e218]:
            - generic [ref=e219]: About
          - listitem [ref=e220]:
            - generic [ref=e221]: How it works
      - navigation "Help" [ref=e222]:
        - heading "Help" [level=2] [ref=e223]
        - list [ref=e224]:
          - listitem [ref=e225]:
            - generic [ref=e226]: Safety
          - listitem [ref=e227]:
            - generic [ref=e228]: Contact
      - navigation "Legal" [ref=e229]:
        - heading "Legal" [level=2] [ref=e230]
        - list [ref=e231]:
          - listitem [ref=e232]:
            - generic [ref=e233]: Terms
          - listitem [ref=e234]:
            - generic [ref=e235]: Privacy
    - paragraph [ref=e237]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-5 seam: a deactivated account cannot write a listing

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "account is deactivated"
Received string:    "Could not find the function public.submit_listing(p_category_id, p_description, p_home_country_code, p_location_id, p_seller_id, p_title) in the schema cache"
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

## admin-locations.spec.ts › L2a locations console › LT-11 one read per country: filtering costs no request, switching the market costs exactly one

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 3
Received: 2

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e410]:
            - generic [ref=e411]: About
          - listitem [ref=e412]:
            - generic [ref=e413]: How it works
      - navigation "Help" [ref=e414]:
        - heading "Help" [level=2] [ref=e415]
        - list [ref=e416]:
          - listitem [ref=e417]:
            - generic [ref=e418]: Safety
          - listitem [ref=e419]:
            - generic [ref=e420]: Contact
      - navigation "Legal" [ref=e421]:
        - heading "Legal" [level=2] [ref=e422]
        - list [ref=e423]:
          - listitem [ref=e424]:
            - generic [ref=e425]: Terms
          - listitem [ref=e426]:
            - generic [ref=e427]: Privacy
    - paragraph [ref=e429]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-5 seam: a deactivated account cannot write a listing

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "account is deactivated"
Received string:    "Could not find the function public.submit_listing(p_category_id, p_description, p_home_country_code, p_location_id, p_seller_id, p_title) in the schema cache"
```

Context:

```text
          - listitem [ref=e225]:
            - generic [ref=e226]: About
          - listitem [ref=e227]:
            - generic [ref=e228]: How it works
      - navigation "Help" [ref=e229]:
        - heading "Help" [level=2] [ref=e230]
        - list [ref=e231]:
          - listitem [ref=e232]:
            - generic [ref=e233]: Safety
          - listitem [ref=e234]:
            - generic [ref=e235]: Contact
      - navigation "Legal" [ref=e236]:
        - heading "Legal" [level=2] [ref=e237]
        - list [ref=e238]:
          - listitem [ref=e239]:
            - generic [ref=e240]: Terms
          - listitem [ref=e241]:
            - generic [ref=e242]: Privacy
    - paragraph [ref=e244]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 2

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 2

```text
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:13856:39 at getResponse (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:13903:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:13856:15) at async client (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:16052:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:15983:20) at async userNext (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:15969:21) ×3
[client-error] console.error: Failed to load resource: the server responded with a status of 404 ()
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:13856:39 at getResponse (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:13903:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:13856:15) at async client (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:16052:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:15983:20) at async userNext (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:15969:21) ×3
[client-error] console.error: Failed to load resource: the server responded with a status of 404 ()
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 5

```text
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:13856:39 at getResponse (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:13903:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:13856:15) at async client (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:16052:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:15983:20) at async userNext (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:15969:21) ×3
[client-error] console.error: Failed to load resource: the server responded with a status of 404 ()
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:13856:39 at getResponse (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:13903:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:13856:15) at async client (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:16052:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:15983:20) at async userNext (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:15969:21) ×3
[client-error] console.error: Failed to load resource: the server responded with a status of 404 ()
```
