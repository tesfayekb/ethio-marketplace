# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45935486979
- Commit: `fdff6e77fd067d87d21f5247f286395057a7a292`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-5b5fb61514dc… (1 read)
- Repeat: 2 of 2 tests repeated — specs directly changed 1/1, importers of a changed helper 0/0; budget 793 s
- Written (UTC): 2026-11-27T04:10:18.031Z
- Passed: 2703 · Skipped: 418 · Failed: 13
- Gating failures: 13 · STAGING-SINK (INC-1175, still gating): 0
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
          - listitem [ref=e285]:
            - generic [ref=e286]: About
          - listitem [ref=e287]:
            - generic [ref=e288]: Contact
      - navigation "Help" [ref=e289]:
        - heading "Help" [level=2] [ref=e290]
        - list [ref=e291]:
          - listitem [ref=e292]:
            - generic [ref=e293]: Safety
      - navigation "Legal" [ref=e294]:
        - heading "Legal" [level=2] [ref=e295]
        - list [ref=e296]:
          - listitem [ref=e297]:
            - link "Terms" [ref=e298] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e299]:
            - link "Privacy" [ref=e300] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e302]: © 2026 ethio.com — All rights reserved.
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

- FLAKY (passed on retry) · `desktop-1280` · source `shard 7` · legal-admin.spec.ts › Admin Legal › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### legal-admin.spec.ts › Admin Legal › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('legal-doc-e2e-al-localx7-davbx-2-d-card-global').getByTestId('legal-view-inforce')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('legal-doc-e2e-al-localx7-davbx-2-d-card-global').getByTestId('legal-view-inforce')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('legal-doc-e2e-al-localx7-davbx-2-d-card-global').getByTestId('legal-view-inforce')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('legal-doc-e2e-al-localx7-davbx-2-d-card-global').getByTestId('legal-view-inforce')


  1108 |       await gotoReady(page, "/admin/legal");
  1109 |       const translatedCard = page.getByTestId(`legal-doc-${kind}-global`);
> 1110 |       await expect(translatedCard.getByTestId("legal-view-inforce")).toBeVisible();
       |                                                                      ^
  1111 |       // J6 — another worker's scratch language may still be offered; nothing this test wrote,
  1112 |       // and no language the product ships, is. The control names every missing language.
  1113 |       const translate = translatedCard.getByTestId("legal-translate-inforce");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:1110:70
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
[client-error] console.error: [error-report] send failed 429 rateLimited
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
[client-error] console.error: [error-report] send failed 429 rateLimited
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
[client-error] console.error: [error-report] send failed 429 rateLimited
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
[client-error] console.error: [error-report] send failed 429 rateLimited
[client-error] HTTP 429 POST /api/error-reports ({"error":"rateLimited","resetsAt":"2026-11-27T04:00:00+00:00"})
[client-error] HTTP 429 POST /api/error-reports ({"error":"rateLimited","resetsAt":"2026-11-27T04:00:00+00:00"})
[client-error] HTTP 429 POST /api/error-reports ({"error":"rateLimited","resetsAt":"2026-11-27T04:00:00+00:00"})
[client-error] HTTP 429 POST /api/error-reports ({"error":"rateLimited","resetsAt":"2026-11-27T04:00:00+00:00"})
```

Context:

```text
          - listitem [ref=e176]:
            - generic [ref=e177]: About
          - listitem [ref=e178]:
            - generic [ref=e179]: Contact
      - navigation "Help" [ref=e180]:
        - heading "Help" [level=2] [ref=e181]
        - list [ref=e182]:
          - listitem [ref=e183]:
            - generic [ref=e184]: Safety
      - navigation "Legal" [ref=e185]:
        - heading "Legal" [level=2] [ref=e186]
        - list [ref=e187]:
          - listitem [ref=e188]:
            - link "Terms" [ref=e189] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e190]:
            - link "Privacy" [ref=e191] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e193]: © 2026 ethio.com — All rights reserved.
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
| smoke | 2026-11-27T03:43:44.019Z | 6.5 min |
| email | 2026-11-27T03:43:41.470Z | 0.3 min |
| webkit | 2026-11-27T03:43:39.558Z | 10.3 min |
| shard 1 | 2026-11-27T03:47:20.172Z | 11.7 min |
| shard 2 | 2026-11-27T03:44:04.774Z | 18.3 min |
| shard 3 | 2026-11-27T03:46:37.787Z | 9.4 min |
| shard 4 | 2026-11-27T03:44:21.281Z | 11.4 min |
| shard 5 | 2026-11-27T03:43:41.889Z | 17.8 min |
| shard 6 | 2026-11-27T03:45:54.500Z | 19.1 min |
| shard 7 | 2026-11-27T03:43:15.636Z | 16.3 min |
| shard 8 | 2026-11-27T03:43:19.090Z | 12.9 min |
| shard 9 | 2026-11-27T03:44:16.895Z | 7.2 min |
| shard 10 | 2026-11-27T03:44:07.463Z | 18.7 min |
| shard 11 | 2026-11-27T03:43:34.851Z | 25.7 min |
| shard 12 | 2026-11-27T03:45:41.988Z | 14.8 min |
| shard 13 | 2026-11-27T03:43:32.020Z | 10.6 min |
| shard 14 | 2026-11-27T03:43:22.366Z | 18.3 min |
| shard 15 | 2026-11-27T03:43:20.256Z | 15.8 min |
| shard 16 | 2026-11-27T03:43:50.997Z | 12.9 min |
| repeat | 2026-11-27T03:43:49.736Z | 0.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 82 | 26.1 min | webkit, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 23.0 min | shard 11 |
| `legal-admin.spec.ts` | 44 | 20.8 min | shard 7 |
| `admin-screening.spec.ts` | 64 | 20.8 min | webkit, shard 15 |
| `admin-translations-console.spec.ts` | 46 | 19.1 min | smoke, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 17.4 min | shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 17.3 min | shard 6 |
| `failure-crawl-admin-content.spec.ts` | 18 | 15.9 min | shard 2 |
| `admin-attributes-links.spec.ts` | 34 | 15.7 min | shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 15.0 min | shard 10 |
| `admin-locations.spec.ts` | 44 | 14.6 min | shard 10 |
| `admin-monetisation.spec.ts` | 34 | 13.8 min | smoke, shard 6 |
| `import-security.spec.ts` | 36 | 12.0 min | shard 8 |
| `admin-roles.spec.ts` | 28 | 11.2 min | shard 13 |
| `failure-crawl-admin-catalog.spec.ts` | 18 | 11.0 min | shard 4 |
| `failure-crawl-admin-people.spec.ts` | 14 | 10.7 min | shard 5 |
| `legal-doors.spec.ts` | 34 | 9.5 min | smoke, shard 1 |
| `shell.spec.ts` | 234 | 9.0 min | shard 1 |
| `admin-categories-console.spec.ts` | 34 | 8.9 min | shard 11 |
| `failure-crawl-member-listings.spec.ts` | 10 | 7.5 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 7.3 min | shard 11 |
| `admin-countries.spec.ts` | 18 | 7.1 min | shard 8 |
| `admin-translations-governance.spec.ts` | 20 | 5.3 min | smoke, shard 1 |
| `admin-translations-data.spec.ts` | 10 | 5.3 min | shard 6 |
| `auth-signout.spec.ts` | 44 | 5.2 min | webkit, shard 5 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 9 |
| `dialogs.spec.ts` | 36 | 4.8 min | webkit, shard 9 |
| `admin-guides.spec.ts` | 14 | 4.7 min | shard 2 |
| `post-wizard-specs.spec.ts` | 82 | 4.6 min | shard 16 |
| `admin-screening-reject.spec.ts` | 10 | 4.4 min | shard 2 |
| `post-wizard-place.spec.ts` | 40 | 4.3 min | shard 15 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.2 min | shard 7 |
| `ad-page.spec.ts` | 104 | 4.1 min | webkit, shard 9 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 14 |
| `post-wizard-pricing.spec.ts` | 52 | 3.8 min | shard 4 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 7 |
| `admin-categories-home.spec.ts` | 10 | 3.6 min | shard 3 |
| `photo-pipeline.spec.ts` | 74 | 3.6 min | webkit, shard 12 |
| `choice-lists.spec.ts` | 96 | 3.5 min | shard 3 |
| `mfa-stepup.spec.ts` | 28 | 3.0 min | webkit, shard 15 |
| `sage-bands.spec.ts` | 76 | 2.9 min | shard 10 |
| `my-listings-ad.spec.ts` | 38 | 2.8 min | shard 8 |
| `post-wizard-category.spec.ts` | 54 | 2.6 min | webkit, shard 13 |
| `failure-crawl-public.spec.ts` | 26 | 2.5 min | shard 12 |
| `name-check-queue.spec.ts` | 8 | 2.4 min | smoke, shard 8 |
| `posting-routes.spec.ts` | 80 | 2.3 min | shard 16 |
| `legal-certify.spec.ts` | 44 | 2.3 min | shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 2.2 min | shard 9 |
| `failure-crawl-member-public.spec.ts` | 14 | 1.8 min | shard 14 |
| `sage-ad-page.spec.ts` | 30 | 1.8 min | webkit, shard 6 |
| `failure-crawl-member-account.spec.ts` | 16 | 1.7 min | shard 15 |
| `admin-services.spec.ts` | 10 | 1.6 min | shard 1 |
| `admin-shell.spec.ts` | 12 | 1.6 min | shard 10 |
| `sage-tiers.spec.ts` | 52 | 1.6 min | webkit, shard 2 |
| `admin-audit.spec.ts` | 16 | 1.5 min | shard 14 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 15 |
| `my-listings-promote.spec.ts` | 10 | 1.5 min | shard 11 |
| `my-listings-page.spec.ts` | 24 | 1.4 min | webkit, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 12 |
| `page-head.spec.ts` | 4 | 1.0 min | shard 9 |
| `press.spec.ts` | 22 | 1.0 min | shard 16 |
| `one-line-slots-admin.spec.ts` | 10 | 0.9 min | shard 13 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 7 |
| `user-guides.spec.ts` | 18 | 0.7 min | shard 8 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 7 |
| `sage-cards.spec.ts` | 40 | 0.7 min | webkit, shard 11 |
| `staff-gate.spec.ts` | 4 | 0.7 min | shard 11 |
| `breadcrumbs.spec.ts` | 6 | 0.7 min | shard 10 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `ad-page-doors.spec.ts` | 30 | 0.6 min | shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 13 |
| `house-style.spec.ts` | 18 | 0.6 min | shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `overlays.spec.ts` | 8 | 0.6 min | shard 6 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 12 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 3 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 4 |
| `settings.spec.ts` | 16 | 0.5 min | shard 7 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 9 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 16 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 7 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 12 |
| `error-reports.spec.ts` | 28 | 0.4 min | shard 15, repeat |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 13 |
| `auth-caller-gates.spec.ts` | 8 | 0.3 min | shard 1 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 3 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 5 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 6 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 14 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 2 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 10 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 4 |
| `submenu.spec.ts` | 14 | 0.2 min | smoke, shard 8 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 15 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 16 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 3 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 5 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 12 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 13 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 8 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 9 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 6 |
| `category-image-routes.spec.ts` | 12 | 0.1 min | shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 14 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 14 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 12 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 16 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 2 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 3 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 13 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 9 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 7 |
| `offline.spec.ts` | 2 | 0.0 min | shard 11 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 15 |
| `geo.spec.ts` | 10 | 0.0 min | shard 6 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 2 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 285.0 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 253.9 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 228.4 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 200.8 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 137.5 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 135.8 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 134.3 s |
| `failure-crawl-admin-content.spec.ts` › FCR-72 /admin/listings/$listingId as staff: loads clean and says every failed read | mobile-360 | 119.1 s |
| `failure-crawl-admin-content.spec.ts` › FCR-70 /admin/ as staff: loads clean and says every failed read | mobile-360 | 112.2 s |
| `failure-crawl-admin-content.spec.ts` › FCR-75 /admin/legal/$versionId as staff: loads clean and says every failed read | mobile-360 | 95.6 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | desktop-1280 | 89.1 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 75.9 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-58 /admin/monetisation as staff: loads clean and says every failed read | mobile-360 | 75.3 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-57 /admin/packages as staff: loads clean and says every failed read | mobile-360 | 75.2 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 75.1 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45935486979-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45935486979-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 45935486979-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45935486979-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45935486979-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45935486979-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45935486979-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45935486979-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45935486979-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45935486979-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 26 (pool 4, fresh 22)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 45935486979-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 45935486979-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45935486979-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45935486979-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 45935486979-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 27 user(s) owned by process 45935486979-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 19 (pool 4, fresh 15)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 45935486979-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 34 (pool 4, fresh 30)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 45935486979-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 45935486979-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45935486979-local-repeat
```

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

```text
/admin/legal/edit at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal/edit at 1280px: [client-error] [error-report] send failed 429 rateLimited
+   "/admin/legal/edit at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal/edit at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/legal/edit at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal/edit at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/legal/edit at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal/edit at 1280px: [client-error] [error-report] send failed 429 rateLimited",
Error: /admin/legal/edit at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal/edit at 360px: [client-error] [error-report] send failed 429 rateLimited
/admin/legal/edit at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal/edit at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/legal/edit at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/legal/edit at 1280px: [client-error] [error-report] send failed 429 rateLimited
+   "/admin/legal/edit at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal/edit at 360px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/legal/edit at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal/edit at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/legal/edit at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/legal/edit at 1280px: [client-error] [error-report] send failed 429 rateLimited",
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
