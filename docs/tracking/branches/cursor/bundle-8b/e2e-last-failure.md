# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45928742041
- Commit: `bb1a797c189e6c4b9549dc00719d7dbd0f50bfe8`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-dae2a6864d48… (0 read)
- Repeat: 2 of 2 tests repeated — specs directly changed 1/1, importers of a changed helper 0/0; budget 793 s
- Written (UTC): 2026-11-27T03:01:48.044Z
- Passed: 2701 · Skipped: 418 · Failed: 15
- Gating failures: 15 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat
- Sources without results: none
- Errors outside any test (INC-589): none

## Gating failures

### failure-crawl-admin-content.spec.ts › FAILURE CRAWL — the staff console's content pages (DEC-459 c) › FCR-70 /admin/ as staff: loads clean and says every failed read

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: /admin/ api /api/error-reports (network): the read failed and the screen said nothing (no failure notice)
/admin/ api /api/error-reports (server): the read failed and the screen said nothing (no failure notice)

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "/admin/ api /api/error-reports (network): the read failed and the screen said nothing (no failure notice)",
+   "/admin/ api /api/error-reports (server): the read failed and the screen said nothing (no failure notice)",
+ ]
--- further error 1 ---
Error: /admin/ api /api/error-reports (network): the read failed and the screen said nothing (no failure notice)
/admin/ api /api/error-reports (server): the read failed and the screen said nothing (no failure notice)

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "/admin/ api /api/error-reports (network): the read failed and the screen said nothing (no failure notice)",
+   "/admin/ api /api/error-reports (server): the read failed and the screen said nothing (no failure notice)",
+ ]

   at helpers/failure-crawl-tests.ts:44

  42 |         contentType: "application/json",
  43 |       });
> 44 |       expect(result.problems, result.problems.join("\n")).toEqual([]);
     |                                                           ^
```

Context:

```text
          - listitem [ref=e334]:
            - generic [ref=e335]: About
          - listitem [ref=e336]:
            - generic [ref=e337]: Contact
      - navigation "Help" [ref=e338]:
        - heading "Help" [level=2] [ref=e339]
        - list [ref=e340]:
          - listitem [ref=e341]:
            - generic [ref=e342]: Safety
      - navigation "Legal" [ref=e343]:
        - heading "Legal" [level=2] [ref=e344]
        - list [ref=e345]:
          - listitem [ref=e346]:
            - link "Terms" [ref=e347] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e348]:
            - link "Privacy" [ref=e349] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e351]: © 2026 ethio.com — All rights reserved.
```
```

### failure-crawl-admin-content.spec.ts › FAILURE CRAWL — the staff console's content pages (DEC-459 c) › FCR-71 /admin/listings as staff: loads clean and says every failed read

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: /admin/listings at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/listings at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "/admin/listings at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/listings at 1280px: [client-error] [error-report] send failed 429 rateLimited",
+ ]
--- further error 1 ---
Error: /admin/listings at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/listings at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "/admin/listings at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/listings at 1280px: [client-error] [error-report] send failed 429 rateLimited",
+ ]

   at helpers/failure-crawl-tests.ts:44

  42 |         contentType: "application/json",
  43 |       });
> 44 |       expect(result.problems, result.problems.join("\n")).toEqual([]);
     |                                                           ^
```

Context:

```text
          - listitem [ref=e334]:
            - generic [ref=e335]: About
          - listitem [ref=e336]:
            - generic [ref=e337]: Contact
      - navigation "Help" [ref=e338]:
        - heading "Help" [level=2] [ref=e339]
        - list [ref=e340]:
          - listitem [ref=e341]:
            - generic [ref=e342]: Safety
      - navigation "Legal" [ref=e343]:
        - heading "Legal" [level=2] [ref=e344]
        - list [ref=e345]:
          - listitem [ref=e346]:
            - link "Terms" [ref=e347] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e348]:
            - link "Privacy" [ref=e349] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e351]: © 2026 ethio.com — All rights reserved.
```
```

### failure-crawl-admin-content.spec.ts › FAILURE CRAWL — the staff console's content pages (DEC-459 c) › FCR-72 /admin/listings/$listingId as staff: loads clean and says every failed read

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: /admin/listings/$listingId at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/listings/$listingId at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/listings/$listingId at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/listings/$listingId at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/listings/$listingId at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/listings/$listingId at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/listings/$listingId at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/listings/$listingId at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/listings/$listingId at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/listings/$listingId at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/listings/$listingId at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/listings/$listingId at 1280px: [client-error] [error-report] send failed 429 rateLimited",
+ ]
--- further error 1 ---
Error: /admin/listings/$listingId at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/listings/$listingId at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/listings/$listingId at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/listings/$listingId at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/listings/$listingId at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/listings/$listingId at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/listings/$listingId at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/listings/$listingId at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/listings/$listingId at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/listings/$listingId at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/listings/$listingId at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/listings/$listingId at 1280px: [client-error] [error-report] send failed 429 rateLimited",
```

Context:

```text
          - listitem [ref=e411]:
            - generic [ref=e412]: About
          - listitem [ref=e413]:
            - generic [ref=e414]: Contact
      - navigation "Help" [ref=e415]:
        - heading "Help" [level=2] [ref=e416]
        - list [ref=e417]:
          - listitem [ref=e418]:
            - generic [ref=e419]: Safety
      - navigation "Legal" [ref=e420]:
        - heading "Legal" [level=2] [ref=e421]
        - list [ref=e422]:
          - listitem [ref=e423]:
            - link "Terms" [ref=e424] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e425]:
            - link "Privacy" [ref=e426] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e428]: © 2026 ethio.com — All rights reserved.
```
```

### failure-crawl-admin-content.spec.ts › FAILURE CRAWL — the staff console's content pages (DEC-459 c) › FCR-73 /admin/listings/$listingId/edit as staff: loads clean and says every failed read

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: /admin/listings/$listingId/edit at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/listings/$listingId/edit at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/listings/$listingId/edit at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/listings/$listingId/edit at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/listings/$listingId/edit at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/listings/$listingId/edit at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/listings/$listingId/edit at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/listings/$listingId/edit at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/listings/$listingId/edit at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/listings/$listingId/edit at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/listings/$listingId/edit at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/listings/$listingId/edit at 1280px: [client-error] [error-report] send failed 429 rateLimited",
+ ]
--- further error 1 ---
Error: /admin/listings/$listingId/edit at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/listings/$listingId/edit at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/listings/$listingId/edit at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/listings/$listingId/edit at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/listings/$listingId/edit at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/listings/$listingId/edit at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/listings/$listingId/edit at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/listings/$listingId/edit at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/listings/$listingId/edit at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/listings/$listingId/edit at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/listings/$listingId/edit at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/listings/$listingId/edit at 1280px: [client-error] [error-report] send failed 429 rateLimited",
```

Context:

```text
          - listitem [ref=e306]:
            - generic [ref=e307]: About
          - listitem [ref=e308]:
            - generic [ref=e309]: Contact
      - navigation "Help" [ref=e310]:
        - heading "Help" [level=2] [ref=e311]
        - list [ref=e312]:
          - listitem [ref=e313]:
            - generic [ref=e314]: Safety
      - navigation "Legal" [ref=e315]:
        - heading "Legal" [level=2] [ref=e316]
        - list [ref=e317]:
          - listitem [ref=e318]:
            - link "Terms" [ref=e319] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e320]:
            - link "Privacy" [ref=e321] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e323]: © 2026 ethio.com — All rights reserved.
```
```

### failure-crawl-admin-content.spec.ts › FAILURE CRAWL — the staff console's content pages (DEC-459 c) › FCR-74 /admin/legal as staff: loads clean and says every failed read

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: /admin/legal at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/legal at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/legal at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/legal at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/legal at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/legal at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal at 1280px: [client-error] [error-report] send failed 429 rateLimited",
+ ]
--- further error 1 ---
Error: /admin/legal at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/legal at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/legal at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/legal at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/legal at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/legal at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal at 1280px: [client-error] [error-report] send failed 429 rateLimited",
```

Context:

```text
          - listitem [ref=e473]:
            - generic [ref=e474]: About
          - listitem [ref=e475]:
            - generic [ref=e476]: Contact
      - navigation "Help" [ref=e477]:
        - heading "Help" [level=2] [ref=e478]
        - list [ref=e479]:
          - listitem [ref=e480]:
            - generic [ref=e481]: Safety
      - navigation "Legal" [ref=e482]:
        - heading "Legal" [level=2] [ref=e483]
        - list [ref=e484]:
          - listitem [ref=e485]:
            - link "Terms" [ref=e486] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e487]:
            - link "Privacy" [ref=e488] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e490]: © 2026 ethio.com — All rights reserved.
```
```

### failure-crawl-admin-content.spec.ts › FAILURE CRAWL — the staff console's content pages (DEC-459 c) › FCR-75 /admin/legal/$versionId as staff: loads clean and says every failed read

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: /admin/legal/$versionId at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal/$versionId at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/legal/$versionId at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal/$versionId at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/legal/$versionId at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal/$versionId at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/legal/$versionId at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal/$versionId at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/legal/$versionId at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal/$versionId at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/legal/$versionId at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal/$versionId at 1280px: [client-error] [error-report] send failed 429 rateLimited",
+ ]
--- further error 1 ---
Error: /admin/legal/$versionId at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal/$versionId at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/legal/$versionId at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal/$versionId at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/legal/$versionId at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal/$versionId at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/legal/$versionId at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal/$versionId at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/legal/$versionId at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal/$versionId at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/legal/$versionId at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal/$versionId at 1280px: [client-error] [error-report] send failed 429 rateLimited",
```

Context:

```text
          - listitem [ref=e386]:
            - generic [ref=e387]: About
          - listitem [ref=e388]:
            - generic [ref=e389]: Contact
      - navigation "Help" [ref=e390]:
        - heading "Help" [level=2] [ref=e391]
        - list [ref=e392]:
          - listitem [ref=e393]:
            - generic [ref=e394]: Safety
      - navigation "Legal" [ref=e395]:
        - heading "Legal" [level=2] [ref=e396]
        - list [ref=e397]:
          - listitem [ref=e398]:
            - link "Terms" [ref=e399] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e400]:
            - link "Privacy" [ref=e401] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e403]: © 2026 ethio.com — All rights reserved.
```
```

### failure-crawl-admin-content.spec.ts › FAILURE CRAWL — the staff console's content pages (DEC-459 c) › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: /admin/legal/edit at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal/edit at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/legal/edit at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal/edit at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/legal/edit at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal/edit at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/legal/edit at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal/edit at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/legal/edit at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal/edit at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/legal/edit at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal/edit at 1280px: [client-error] [error-report] send failed 429 rateLimited",
+ ]
--- further error 1 ---
Error: /admin/legal/edit at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal/edit at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/legal/edit at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal/edit at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/legal/edit at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal/edit at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/legal/edit at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal/edit at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/legal/edit at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal/edit at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/legal/edit at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal/edit at 1280px: [client-error] [error-report] send failed 429 rateLimited",
```

Context:

```text
          - listitem [ref=e284]:
            - generic [ref=e285]: About
          - listitem [ref=e286]:
            - generic [ref=e287]: Contact
      - navigation "Help" [ref=e288]:
        - heading "Help" [level=2] [ref=e289]
        - list [ref=e290]:
          - listitem [ref=e291]:
            - generic [ref=e292]: Safety
      - navigation "Legal" [ref=e293]:
        - heading "Legal" [level=2] [ref=e294]
        - list [ref=e295]:
          - listitem [ref=e296]:
            - link "Terms" [ref=e297] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e298]:
            - link "Privacy" [ref=e299] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e301]: © 2026 ethio.com — All rights reserved.
```
```

### failure-crawl-admin-content.spec.ts › FAILURE CRAWL — the staff console's content pages (DEC-459 c) › FCR-77 /admin/translations as staff: loads clean and says every failed read

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: /admin/translations at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/translations at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/translations at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/translations at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/translations at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/translations at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/translations at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/translations at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/translations at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/translations at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/translations at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/translations at 1280px: [client-error] [error-report] send failed 429 rateLimited",
+ ]
--- further error 1 ---
Error: /admin/translations at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/translations at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/translations at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/translations at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/translations at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/translations at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/translations at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/translations at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/translations at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/translations at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/translations at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/translations at 1280px: [client-error] [error-report] send failed 429 rateLimited",
```

Context:

```text
          - listitem [ref=e350]:
            - generic [ref=e351]: About
          - listitem [ref=e352]:
            - generic [ref=e353]: Contact
      - navigation "Help" [ref=e354]:
        - heading "Help" [level=2] [ref=e355]
        - list [ref=e356]:
          - listitem [ref=e357]:
            - generic [ref=e358]: Safety
      - navigation "Legal" [ref=e359]:
        - heading "Legal" [level=2] [ref=e360]
        - list [ref=e361]:
          - listitem [ref=e362]:
            - link "Terms" [ref=e363] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e364]:
            - link "Privacy" [ref=e365] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e367]: © 2026 ethio.com — All rights reserved.
```
```

### failure-crawl-admin-content.spec.ts › FAILURE CRAWL — the staff console's content pages (DEC-459 c) › FCR-78 /admin/translations/$lang as staff: loads clean and says every failed read

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: /admin/translations/$lang at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/translations/$lang at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/translations/$lang at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/translations/$lang at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/translations/$lang at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/translations/$lang at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/translations/$lang at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/translations/$lang at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/translations/$lang at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/translations/$lang at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/translations/$lang at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/translations/$lang at 1280px: [client-error] [error-report] send failed 429 rateLimited",
+ ]
--- further error 1 ---
Error: /admin/translations/$lang at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/translations/$lang at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/translations/$lang at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/translations/$lang at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/translations/$lang at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/translations/$lang at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/translations/$lang at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/translations/$lang at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/translations/$lang at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/translations/$lang at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/translations/$lang at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/translations/$lang at 1280px: [client-error] [error-report] send failed 429 rateLimited",
```

Context:

```text
          - listitem [ref=e342]:
            - generic [ref=e343]: About
          - listitem [ref=e344]:
            - generic [ref=e345]: Contact
      - navigation "Help" [ref=e346]:
        - heading "Help" [level=2] [ref=e347]
        - list [ref=e348]:
          - listitem [ref=e349]:
            - generic [ref=e350]: Safety
      - navigation "Legal" [ref=e351]:
        - heading "Legal" [level=2] [ref=e352]
        - list [ref=e353]:
          - listitem [ref=e354]:
            - link "Terms" [ref=e355] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e356]:
            - link "Privacy" [ref=e357] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e359]: © 2026 ethio.com — All rights reserved.
```
```

### failure-crawl-admin-catalog.spec.ts › FAILURE CRAWL — the staff console's catalogue pages (DEC-459 c) › FCR-56 /admin/places as staff: loads clean and says every failed read

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: /admin/places at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/places at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/places at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/places at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/places at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/places at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/places at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/places at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/places at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/places at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/places at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/places at 1280px: [client-error] [error-report] send failed 429 rateLimited",
+ ]
--- further error 1 ---
Error: /admin/places at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/places at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/places at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/places at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/places at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/places at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/places at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/places at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/places at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/places at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/places at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/places at 1280px: [client-error] [error-report] send failed 429 rateLimited",
```

Context:

```text
          - listitem [ref=e334]:
            - generic [ref=e335]: About
          - listitem [ref=e336]:
            - generic [ref=e337]: Contact
      - navigation "Help" [ref=e338]:
        - heading "Help" [level=2] [ref=e339]
        - list [ref=e340]:
          - listitem [ref=e341]:
            - generic [ref=e342]: Safety
      - navigation "Legal" [ref=e343]:
        - heading "Legal" [level=2] [ref=e344]
        - list [ref=e345]:
          - listitem [ref=e346]:
            - link "Terms" [ref=e347] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e348]:
            - link "Privacy" [ref=e349] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e351]: © 2026 ethio.com — All rights reserved.
```
```

### failure-crawl-admin-catalog.spec.ts › FAILURE CRAWL — the staff console's catalogue pages (DEC-459 c) › FCR-57 /admin/packages as staff: loads clean and says every failed read

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: /admin/packages at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/packages at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/packages at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/packages at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/packages at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/packages at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/packages at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/packages at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/packages at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/packages at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/packages at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/packages at 1280px: [client-error] [error-report] send failed 429 rateLimited",
+ ]
--- further error 1 ---
Error: /admin/packages at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/packages at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/packages at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/packages at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/packages at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/packages at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/packages at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/packages at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/packages at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/packages at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/packages at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/packages at 1280px: [client-error] [error-report] send failed 429 rateLimited",
```

Context:

```text
          - listitem [ref=e369]:
            - generic [ref=e370]: About
          - listitem [ref=e371]:
            - generic [ref=e372]: Contact
      - navigation "Help" [ref=e373]:
        - heading "Help" [level=2] [ref=e374]
        - list [ref=e375]:
          - listitem [ref=e376]:
            - generic [ref=e377]: Safety
      - navigation "Legal" [ref=e378]:
        - heading "Legal" [level=2] [ref=e379]
        - list [ref=e380]:
          - listitem [ref=e381]:
            - link "Terms" [ref=e382] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e383]:
            - link "Privacy" [ref=e384] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e386]: © 2026 ethio.com — All rights reserved.
```
```

### failure-crawl-admin-catalog.spec.ts › FAILURE CRAWL — the staff console's catalogue pages (DEC-459 c) › FCR-58 /admin/monetisation as staff: loads clean and says every failed read

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: /admin/monetisation at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/monetisation at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/monetisation at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/monetisation at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/monetisation at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/monetisation at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/monetisation at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/monetisation at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/monetisation at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/monetisation at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/monetisation at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/monetisation at 1280px: [client-error] [error-report] send failed 429 rateLimited",
+ ]
--- further error 1 ---
Error: /admin/monetisation at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/monetisation at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/monetisation at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/monetisation at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/monetisation at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/monetisation at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/monetisation at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/monetisation at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/monetisation at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/monetisation at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/monetisation at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/monetisation at 1280px: [client-error] [error-report] send failed 429 rateLimited",
```

Context:

```text
          - listitem [ref=e369]:
            - generic [ref=e370]: About
          - listitem [ref=e371]:
            - generic [ref=e372]: Contact
      - navigation "Help" [ref=e373]:
        - heading "Help" [level=2] [ref=e374]
        - list [ref=e375]:
          - listitem [ref=e376]:
            - generic [ref=e377]: Safety
      - navigation "Legal" [ref=e378]:
        - heading "Legal" [level=2] [ref=e379]
        - list [ref=e380]:
          - listitem [ref=e381]:
            - link "Terms" [ref=e382] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e383]:
            - link "Privacy" [ref=e384] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e386]: © 2026 ethio.com — All rights reserved.
```
```

### failure-crawl-admin-people.spec.ts › FAILURE CRAWL — the staff console's people pages (DEC-459 c) › FCR-65 /admin/audit as staff: loads clean and says every failed read

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: /admin/audit at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/audit at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/audit at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/audit at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/audit at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/audit at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/audit at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/audit at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/audit at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/audit at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/audit at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/audit at 1280px: [client-error] [error-report] send failed 429 rateLimited",
+ ]
--- further error 1 ---
Error: /admin/audit at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/audit at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/audit at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/audit at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/audit at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/audit at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/audit at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/audit at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/audit at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/audit at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/audit at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/audit at 1280px: [client-error] [error-report] send failed 429 rateLimited",
```

Context:

```text
          - listitem [ref=e1033]:
            - generic [ref=e1034]: About
          - listitem [ref=e1035]:
            - generic [ref=e1036]: Contact
      - navigation "Help" [ref=e1037]:
        - heading "Help" [level=2] [ref=e1038]
        - list [ref=e1039]:
          - listitem [ref=e1040]:
            - generic [ref=e1041]: Safety
      - navigation "Legal" [ref=e1042]:
        - heading "Legal" [level=2] [ref=e1043]
        - list [ref=e1044]:
          - listitem [ref=e1045]:
            - link "Terms" [ref=e1046] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e1047]:
            - link "Privacy" [ref=e1048] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e1050]: © 2026 ethio.com — All rights reserved.
```
```

### failure-crawl-admin-people.spec.ts › FAILURE CRAWL — the staff console's people pages (DEC-459 c) › FCR-66 /admin/screening as staff: loads clean and says every failed read

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: /admin/screening at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/screening at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/screening at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/screening at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/screening at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/screening at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/screening at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/screening at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/screening at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/screening at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/screening at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/screening at 1280px: [client-error] [error-report] send failed 429 rateLimited",
+ ]
--- further error 1 ---
Error: /admin/screening at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/screening at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/screening at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/screening at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/screening at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/screening at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/screening at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/screening at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/screening at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/screening at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/screening at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/screening at 1280px: [client-error] [error-report] send failed 429 rateLimited",
```

Context:

```text
          - listitem [ref=e345]:
            - generic [ref=e346]: About
          - listitem [ref=e347]:
            - generic [ref=e348]: Contact
      - navigation "Help" [ref=e349]:
        - heading "Help" [level=2] [ref=e350]
        - list [ref=e351]:
          - listitem [ref=e352]:
            - generic [ref=e353]: Safety
      - navigation "Legal" [ref=e354]:
        - heading "Legal" [level=2] [ref=e355]
        - list [ref=e356]:
          - listitem [ref=e357]:
            - link "Terms" [ref=e358] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e359]:
            - link "Privacy" [ref=e360] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e362]: © 2026 ethio.com — All rights reserved.
```
```

### failure-crawl-admin-people.spec.ts › FAILURE CRAWL — the staff console's people pages (DEC-459 c) › FCR-67 /admin/ai as staff: loads clean and says every failed read

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: /admin/ai at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/ai at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/ai at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/ai at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/ai at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/ai at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/ai at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/ai at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/ai at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/ai at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/ai at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/ai at 1280px: [client-error] [error-report] send failed 429 rateLimited",
+ ]
--- further error 1 ---
Error: /admin/ai at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/ai at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/ai at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/ai at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/ai at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/ai at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "/admin/ai at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/ai at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/ai at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/ai at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/ai at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/ai at 1280px: [client-error] [error-report] send failed 429 rateLimited",
```

Context:

```text
          - listitem [ref=e696]:
            - generic [ref=e697]: About
          - listitem [ref=e698]:
            - generic [ref=e699]: Contact
      - navigation "Help" [ref=e700]:
        - heading "Help" [level=2] [ref=e701]
        - list [ref=e702]:
          - listitem [ref=e703]:
            - generic [ref=e704]: Safety
      - navigation "Legal" [ref=e705]:
        - heading "Legal" [level=2] [ref=e706]
        - list [ref=e707]:
          - listitem [ref=e708]:
            - link "Terms" [ref=e709] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e710]:
            - link "Privacy" [ref=e711] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e713]: © 2026 ethio.com — All rights reserved.
```
```

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 14` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone — Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

## Flaky bodies (DEC-078)

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
--- further error 1 ---
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

   at helpers/session.ts:331

  329 |   }, storageKey());
  330 |   if (actual !== expected) {
> 331 |     throw new Error(
      |           ^
  332 |       `[e2e:session] injected identity mismatch — expected user ${expected}, page holds ${actual ?? "no session"}.`,
  333 |     );
  334 |   }
    at assertInjectedIdentity (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:331:11)
    at signInStaff (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/staff-factor.ts:171:3)
    at holder (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2121:7)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2155:5
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
[client-error] console.error: [error-report] send failed 429 rateLimited
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
[client-error] console.error: [error-report] send failed 429 rateLimited
[client-error] HTTP 429 POST /api/error-reports ({"error":"rateLimited","resetsAt":"2026-11-27T03:00:00+00:00"})
[client-error] HTTP 429 POST /api/error-reports ({"error":"rateLimited","resetsAt":"2026-11-27T03:00:00+00:00"})
```

Context:

```text
            - listitem [ref=e330]:
              - generic [ref=e331]: Safety
        - navigation "Legal" [ref=e332]:
          - heading "Legal" [level=2] [ref=e333]
          - list [ref=e334]:
            - listitem [ref=e335]:
              - link "Terms" [ref=e336] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e337]:
              - link "Privacy" [ref=e338] [cursor=pointer]:
                - /url: /privacy
      - paragraph [ref=e340]: © 2026 ethio.com — All rights reserved.
  - region "e2e-post-local-14-2-81zzsv" [ref=e341]:
    - list [ref=e342]:
      - listitem [ref=e343]:
        - link "e2e-post-local-14-2-0hp7ou" [ref=e344] [cursor=pointer]:
          - /url: /c/e2e-post-local-14-2-0hp7ou
          - img [ref=e346]
          - generic [ref=e350]: e2e-post-local-14-2-0hp7ou
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (20 of 20 results files read, 20 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

64 line(s), 28 message(s): 1 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 8, shard 11 |
| `categories wrongFile` (quiet) | 4 | shard 8, shard 11 |
| `definitions badHeader` (quiet) | 4 | shard 5, shard 8 |
| `definitions wrongFile` (quiet) | 4 | shard 5, shard 8 |
| `categories file too large` (quiet) | 2 | shard 8 |
| `categories nulByte` (quiet) | 2 | shard 8 |
| `categories unknownColumn` (quiet) | 2 | shard 8 |
| `countries badHeader` (quiet) | 2 | shard 8 |
| `countries nulByte` (quiet) | 2 | shard 8 |
| `countries tooManyRows` (quiet) | 2 | shard 8 |
| `countries unknownColumn` (quiet) | 2 | shard 8 |
| `countries wrongFile` (quiet) | 2 | shard 8 |
| `definitions nulByte` (quiet) | 2 | shard 8 |
| `definitions tooManyRows` (quiet) | 2 | shard 8 |
| `definitions unknownColumn` (quiet) | 2 | shard 8 |
| `links unknownColumn` (quiet) | 2 | shard 8 |
| `locations badHeader` (quiet) | 2 | shard 8 |
| `locations file too large` (quiet) | 2 | shard 8 |
| `locations nulByte` (quiet) | 2 | shard 8 |
| `locations unknownColumn` (quiet) | 2 | shard 8 |
| `locations wrongFile` (quiet) | 2 | shard 8 |
| `not signed in Auth session missing!` | 2 | shard 13 |
| `strings badHeader` (quiet) | 2 | shard 8 |
| `strings emptyFile` (quiet) | 2 | shard 8 |
| `strings nulByte` (quiet) | 2 | shard 8 |
| `strings tooManyRows` (quiet) | 2 | shard 8 |
| `strings unknownColumn` (quiet) | 2 | shard 8 |
| `strings wrongFile` (quiet) | 2 | shard 8 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### not signed in Auth session missing!

- Count: 2 · Sources: shard 13
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): RP-1 gating: moderator refused, admin sees the list, signed-out deep link redire ×2 · AU-2 search and status filter ×1 · RP-2 create: a super admin creates a custom role through step-up ×1

```text
[WebServer] [ssr-error] /api/error-reports not signed in Auth session missing!
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-27T02:36:29.093Z | 6.8 min |
| email | 2026-11-27T02:33:50.109Z | 0.3 min |
| webkit | 2026-11-27T02:37:06.504Z | 9.9 min |
| shard 1 | 2026-11-27T02:34:45.825Z | 13.1 min |
| shard 2 | 2026-11-27T02:34:14.705Z | 19.8 min |
| shard 3 | 2026-11-27T02:34:46.693Z | 8.8 min |
| shard 4 | 2026-11-27T02:35:48.910Z | 10.4 min |
| shard 5 | 2026-11-27T02:34:14.505Z | 17.8 min |
| shard 6 | 2026-11-27T02:34:24.989Z | 19.1 min |
| shard 7 | 2026-11-27T02:34:16.973Z | 16.3 min |
| shard 8 | 2026-11-27T02:34:22.793Z | 12.9 min |
| shard 9 | 2026-11-27T02:34:23.980Z | 7.8 min |
| shard 10 | 2026-11-27T02:33:59.897Z | 18.4 min |
| shard 11 | 2026-11-27T02:34:50.835Z | 25.9 min |
| shard 12 | 2026-11-27T02:36:29.493Z | 15.1 min |
| shard 13 | 2026-11-27T02:33:52.646Z | 10.3 min |
| shard 14 | 2026-11-27T02:34:39.089Z | 19.1 min |
| shard 15 | 2026-11-27T02:34:58.082Z | 16.7 min |
| shard 16 | 2026-11-27T02:34:42.666Z | 13.0 min |
| repeat | 2026-11-27T02:34:26.112Z | 0.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 82 | 26.5 min | webkit, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 22.9 min | shard 11 |
| `admin-screening.spec.ts` | 64 | 21.3 min | webkit, shard 15 |
| `legal-admin.spec.ts` | 44 | 21.1 min | shard 7 |
| `admin-translations-console.spec.ts` | 46 | 19.1 min | smoke, shard 12 |
| `failure-crawl-admin-content.spec.ts` | 18 | 17.5 min | shard 2 |
| `admin-attributes-import.spec.ts` | 40 | 17.4 min | shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 17.3 min | shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 15.7 min | shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 15.3 min | shard 10 |
| `admin-locations.spec.ts` | 44 | 15.0 min | shard 10 |
| `admin-monetisation.spec.ts` | 34 | 13.7 min | smoke, shard 6 |
| `import-security.spec.ts` | 36 | 11.9 min | shard 8 |
| `admin-roles.spec.ts` | 28 | 10.9 min | shard 13 |
| `failure-crawl-admin-people.spec.ts` | 14 | 10.7 min | shard 5 |
| `shell.spec.ts` | 234 | 10.2 min | shard 1 |
| `failure-crawl-admin-catalog.spec.ts` | 18 | 10.0 min | shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.2 min | shard 11 |
| `legal-doors.spec.ts` | 34 | 9.1 min | smoke, shard 1 |
| `failure-crawl-member-listings.spec.ts` | 10 | 7.2 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 7.0 min | shard 11 |
| `admin-countries.spec.ts` | 18 | 7.0 min | shard 8 |
| `admin-translations-governance.spec.ts` | 20 | 6.3 min | smoke, shard 1 |
| `admin-translations-data.spec.ts` | 10 | 5.3 min | shard 6 |
| `auth-signout.spec.ts` | 44 | 5.3 min | webkit, shard 5 |
| `post-wizard-place.spec.ts` | 40 | 5.1 min | shard 15 |
| `dialogs.spec.ts` | 36 | 4.9 min | webkit, shard 9 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.8 min | shard 16 |
| `admin-guides.spec.ts` | 14 | 4.7 min | shard 2 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.3 min | shard 7 |
| `admin-screening-reject.spec.ts` | 10 | 4.2 min | shard 2 |
| `ad-page.spec.ts` | 104 | 4.2 min | webkit, shard 9 |
| `photo-pipeline.spec.ts` | 74 | 4.0 min | webkit, shard 12 |
| `admin-users.spec.ts` | 28 | 4.0 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 14 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 7 |
| `admin-categories-home.spec.ts` | 10 | 3.4 min | shard 3 |
| `mfa-stepup.spec.ts` | 28 | 3.1 min | webkit, shard 15 |
| `my-listings-ad.spec.ts` | 38 | 2.9 min | shard 8 |
| `post-wizard-pricing.spec.ts` | 52 | 2.9 min | shard 4 |
| `sage-bands.spec.ts` | 76 | 2.7 min | shard 10 |
| `failure-crawl-public.spec.ts` | 26 | 2.6 min | shard 12 |
| `post-wizard-category.spec.ts` | 54 | 2.5 min | webkit, shard 13 |
| `choice-lists.spec.ts` | 96 | 2.5 min | shard 3 |
| `posting-routes.spec.ts` | 80 | 2.4 min | shard 16 |
| `name-check-queue.spec.ts` | 8 | 2.4 min | smoke, shard 8 |
| `post-wizard-resets.spec.ts` | 34 | 2.3 min | shard 9 |
| `failure-crawl-member-account.spec.ts` | 16 | 1.9 min | shard 15 |
| `failure-crawl-member-public.spec.ts` | 14 | 1.8 min | shard 14 |
| `my-listings-promote.spec.ts` | 10 | 1.8 min | shard 11 |
| `sage-ad-page.spec.ts` | 30 | 1.7 min | webkit, shard 6 |
| `admin-services.spec.ts` | 10 | 1.7 min | shard 1 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 14 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 15 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 4 |
| `sage-tiers.spec.ts` | 52 | 1.3 min | webkit, shard 2 |
| `admin-shell.spec.ts` | 12 | 1.3 min | shard 10 |
| `my-listings-doors.spec.ts` | 28 | 1.3 min | shard 9 |
| `my-listings-page.spec.ts` | 24 | 1.1 min | webkit, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 12 |
| `page-head.spec.ts` | 4 | 1.0 min | shard 9 |
| `press.spec.ts` | 22 | 1.0 min | shard 16 |
| `one-line-slots-admin.spec.ts` | 10 | 0.9 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 11 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 7 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 8 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 7 |
| `staff-gate.spec.ts` | 4 | 0.7 min | shard 11 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.6 min | shard 10 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 13 |
| `house-style.spec.ts` | 18 | 0.6 min | shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `overlays.spec.ts` | 8 | 0.6 min | shard 6 |
| `settings.spec.ts` | 16 | 0.5 min | shard 7 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 12 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 16 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 1 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 7 |
| `error-reports.spec.ts` | 28 | 0.4 min | shard 15, repeat |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 3 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 4 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 13 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 5 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 6 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 14 |
| `submenu.spec.ts` | 14 | 0.2 min | smoke, shard 8 |
| `shell-bands.spec.ts` | 16 | 0.2 min | smoke, shard 3 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 2 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 15 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 16 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 10 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 2 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 12 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 13 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 5 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 9 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 3 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 15 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 6 |
| `category-image-routes.spec.ts` | 12 | 0.1 min | shard 5 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 11 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 12 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 14 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 16 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 14 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 2 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 9 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 7 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 13 |
| `offline.spec.ts` | 2 | 0.1 min | shard 11 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 3 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 15 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 6 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 2 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 279.6 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 246.8 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 216.7 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 201.0 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 137.6 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 135.5 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 135.2 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 133.8 s |
| `failure-crawl-admin-content.spec.ts` › FCR-72 /admin/listings/$listingId as staff: loads clean and says every failed read | mobile-360 | 112.9 s |
| `failure-crawl-admin-content.spec.ts` › FCR-70 /admin/ as staff: loads clean and says every failed read | mobile-360 | 108.0 s |
| `failure-crawl-admin-content.spec.ts` › FCR-78 /admin/translations/$lang as staff: loads clean and says every failed read | mobile-360 | 103.5 s |
| `failure-crawl-admin-content.spec.ts` › FCR-75 /admin/legal/$versionId as staff: loads clean and says every failed read | mobile-360 | 99.7 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 75.4 s |
| `failure-crawl-admin-content.spec.ts` › FCR-71 /admin/listings as staff: loads clean and says every failed read | mobile-360 | 72.4 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 70.5 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45928742041-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45928742041-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 45928742041-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45928742041-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45928742041-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45928742041-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45928742041-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45928742041-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45928742041-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45928742041-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 26 (pool 4, fresh 22)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 45928742041-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 45928742041-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45928742041-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45928742041-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 45928742041-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 27 user(s) owned by process 45928742041-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 20 (pool 4, fresh 16)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 18 user(s) owned by process 45928742041-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 34 (pool 4, fresh 30)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 45928742041-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 45928742041-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45928742041-local-repeat
```

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

```text
/admin/translations/$lang at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/translations/$lang at 1280px: [client-error] [error-report] send failed 429 rateLimited
+   "/admin/translations/$lang at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/translations/$lang at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/translations/$lang at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/translations/$lang at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/translations/$lang at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/translations/$lang at 1280px: [client-error] [error-report] send failed 429 rateLimited",
Error: /admin/translations/$lang at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/translations/$lang at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/translations/$lang at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/translations/$lang at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/translations/$lang at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/translations/$lang at 1280px: [client-error] [error-report] send failed 429 rateLimited
+   "/admin/translations/$lang at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/translations/$lang at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/translations/$lang at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/translations/$lang at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/translations/$lang at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/translations/$lang at 1280px: [client-error] [error-report] send failed 429 rateLimited",
```

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

```text
/admin/monetisation at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/monetisation at 1280px: [client-error] [error-report] send failed 429 rateLimited
+   "/admin/monetisation at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/monetisation at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/monetisation at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/monetisation at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/monetisation at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/monetisation at 1280px: [client-error] [error-report] send failed 429 rateLimited",
Error: /admin/monetisation at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/monetisation at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/monetisation at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/monetisation at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/monetisation at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/monetisation at 1280px: [client-error] [error-report] send failed 429 rateLimited
+   "/admin/monetisation at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/monetisation at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/monetisation at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/monetisation at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/monetisation at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/monetisation at 1280px: [client-error] [error-report] send failed 429 rateLimited",
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
```

## Client errors: shard 5

```text
/admin/ai at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/ai at 1280px: [client-error] [error-report] send failed 429 rateLimited
+   "/admin/ai at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/ai at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/ai at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/ai at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/ai at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/ai at 1280px: [client-error] [error-report] send failed 429 rateLimited",
Error: /admin/ai at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/ai at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/ai at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/ai at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/ai at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/ai at 1280px: [client-error] [error-report] send failed 429 rateLimited
+   "/admin/ai at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/ai at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/ai at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/ai at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/ai at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/ai at 1280px: [client-error] [error-report] send failed 429 rateLimited",
```
