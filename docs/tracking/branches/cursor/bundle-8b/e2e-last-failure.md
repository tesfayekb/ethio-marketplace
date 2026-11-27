# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45929211475
- Commit: `8e9b95fd4755e51fe2cad208341be8100263d011`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-5b5fb61514dc… (0 read)
- Repeat: 2 of 2 tests repeated — specs directly changed 1/1, importers of a changed helper 0/0; budget 793 s
- Written (UTC): 2026-11-27T03:34:17.779Z
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
          - listitem [ref=e324]:
            - generic [ref=e325]: About
          - listitem [ref=e326]:
            - generic [ref=e327]: Contact
      - navigation "Help" [ref=e328]:
        - heading "Help" [level=2] [ref=e329]
        - list [ref=e330]:
          - listitem [ref=e331]:
            - generic [ref=e332]: Safety
      - navigation "Legal" [ref=e333]:
        - heading "Legal" [level=2] [ref=e334]
        - list [ref=e335]:
          - listitem [ref=e336]:
            - link "Terms" [ref=e337] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e338]:
            - link "Privacy" [ref=e339] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e341]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e339]:
            - generic [ref=e340]: About
          - listitem [ref=e341]:
            - generic [ref=e342]: Contact
      - navigation "Help" [ref=e343]:
        - heading "Help" [level=2] [ref=e344]
        - list [ref=e345]:
          - listitem [ref=e346]:
            - generic [ref=e347]: Safety
      - navigation "Legal" [ref=e348]:
        - heading "Legal" [level=2] [ref=e349]
        - list [ref=e350]:
          - listitem [ref=e351]:
            - link "Terms" [ref=e352] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e353]:
            - link "Privacy" [ref=e354] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e356]: © 2026 ethio.com — All rights reserved.
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

### failure-crawl-admin-people.spec.ts › FAILURE CRAWL — the staff console's people pages (DEC-459 c) › FCR-63 /admin/roles/$roleId as staff: loads clean and says every failed read

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: /admin/roles/$roleId at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/roles/$roleId at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/roles/$roleId at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/roles/$roleId at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 6

- Array []
+ Array [
+   "/admin/roles/$roleId at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/roles/$roleId at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/roles/$roleId at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/roles/$roleId at 1280px: [client-error] [error-report] send failed 429 rateLimited",
+ ]
--- further error 1 ---
Error: /admin/roles/$roleId at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/roles/$roleId at 768px: [client-error] [error-report] send failed 429 rateLimited
/admin/roles/$roleId at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
/admin/roles/$roleId at 1280px: [client-error] [error-report] send failed 429 rateLimited

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 6

- Array []
+ Array [
+   "/admin/roles/$roleId at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/roles/$roleId at 768px: [client-error] [error-report] send failed 429 rateLimited",
+   "/admin/roles/$roleId at 1280px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)",
+   "/admin/roles/$roleId at 1280px: [client-error] [error-report] send failed 429 rateLimited",
+ ]

   at helpers/failure-crawl-tests.ts:44

```

Context:

```text
          - listitem [ref=e288]:
            - generic [ref=e289]: About
          - listitem [ref=e290]:
            - generic [ref=e291]: Contact
      - navigation "Help" [ref=e292]:
        - heading "Help" [level=2] [ref=e293]
        - list [ref=e294]:
          - listitem [ref=e295]:
            - generic [ref=e296]: Safety
      - navigation "Legal" [ref=e297]:
        - heading "Legal" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - link "Terms" [ref=e301] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e302]:
            - link "Privacy" [ref=e303] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e343]:
            - generic [ref=e344]: About
          - listitem [ref=e345]:
            - generic [ref=e346]: Contact
      - navigation "Help" [ref=e347]:
        - heading "Help" [level=2] [ref=e348]
        - list [ref=e349]:
          - listitem [ref=e350]:
            - generic [ref=e351]: Safety
      - navigation "Legal" [ref=e352]:
        - heading "Legal" [level=2] [ref=e353]
        - list [ref=e354]:
          - listitem [ref=e355]:
            - link "Terms" [ref=e356] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e357]:
            - link "Privacy" [ref=e358] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e360]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e630]:
            - generic [ref=e631]: About
          - listitem [ref=e632]:
            - generic [ref=e633]: Contact
      - navigation "Help" [ref=e634]:
        - heading "Help" [level=2] [ref=e635]
        - list [ref=e636]:
          - listitem [ref=e637]:
            - generic [ref=e638]: Safety
      - navigation "Legal" [ref=e639]:
        - heading "Legal" [level=2] [ref=e640]
        - list [ref=e641]:
          - listitem [ref=e642]:
            - link "Terms" [ref=e643] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e644]:
            - link "Privacy" [ref=e645] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e647]: © 2026 ethio.com — All rights reserved.
```
```

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `webkit-390` · source `webkit` · sage-ad-page.spec.ts › Sage ad page at 390, light › SAP-1 each tier's ad page reads its tokens (390, light) — Error: featured ad: the segment

## Flaky bodies (DEC-078)

### sage-ad-page.spec.ts › Sage ad page at 390, light › SAP-1 each tier's ad page reads its tokens (390, light)

- Source: `webkit`
- Project: `webkit-390`

```text
Error: featured ad: the segment

expect(received).toBe(expected) // Object.is equality

Expected: "oklch(0.946 0.017 164.699997)"
Received: "oklab(0.946 -0.016397 0.004486 / 0.124013)"
--- further error 1 ---
Error: featured ad: the segment

expect(received).toBe(expected) // Object.is equality

Expected: "oklch(0.946 0.017 164.699997)"
Received: "oklab(0.946 -0.016397 0.004486 / 0.124013)"

  283 |             await page.mouse.move(0, 0);
  284 |             await settled(page);
> 285 |             expect(await style(description, "background-color"), `${at}: the segment`).toBe(
      |                                                                                        ^
  286 |               await tokenStyle(
  287 |                 page,
  288 |                 mode,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-ad-page.spec.ts:285:88
```

Context:

```text
          - listitem [ref=e336]:
            - generic [ref=e337]: About
          - listitem [ref=e338]:
            - generic [ref=e339]: Contact
      - navigation "Help" [ref=e340]:
        - heading "Help" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - generic [ref=e344]: Safety
      - navigation "Legal" [ref=e345]:
        - heading "Legal" [level=2] [ref=e346]
        - list [ref=e347]:
          - listitem [ref=e348]:
            - link "Terms" [ref=e349]:
              - /url: /terms
          - listitem [ref=e350]:
            - link "Privacy" [ref=e351]:
              - /url: /privacy
    - paragraph [ref=e353]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (20 of 20 results files read, 20 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

65 line(s), 28 message(s): 1 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 8, shard 11 |
| `categories wrongFile` (quiet) | 4 | shard 8, shard 11 |
| `definitions badHeader` (quiet) | 4 | shard 5, shard 8 |
| `definitions wrongFile` (quiet) | 4 | shard 5, shard 8 |
| `not signed in Auth session missing!` | 3 | shard 5, shard 13 |
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
| `strings badHeader` (quiet) | 2 | shard 8 |
| `strings emptyFile` (quiet) | 2 | shard 8 |
| `strings nulByte` (quiet) | 2 | shard 8 |
| `strings tooManyRows` (quiet) | 2 | shard 8 |
| `strings unknownColumn` (quiet) | 2 | shard 8 |
| `strings wrongFile` (quiet) | 2 | shard 8 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### not signed in Auth session missing!

- Count: 3 · Sources: shard 5, shard 13
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): RP-1 gating: moderator refused, admin sees the list, signed-out deep link redire ×2 · AT-69 an imported brand option is in the name table after commit and gone after  ×1 · AU-2 search and status filter ×1 · RP-2 create: a super admin creates a custom role through step-up ×1 · SO-16 a sign-out and a fresh sign-in in one tab, with a second tab open, keep th ×1

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
| smoke | 2026-11-27T03:05:49.894Z | 6.9 min |
| email | 2026-11-27T03:05:21.858Z | 0.3 min |
| webkit | 2026-11-27T03:06:30.202Z | 14.0 min |
| shard 1 | 2026-11-27T03:05:38.310Z | 11.9 min |
| shard 2 | 2026-11-27T03:05:56.771Z | 19.1 min |
| shard 3 | 2026-11-27T03:09:11.134Z | 8.8 min |
| shard 4 | 2026-11-27T03:05:40.915Z | 10.5 min |
| shard 5 | 2026-11-27T03:06:11.641Z | 18.4 min |
| shard 6 | 2026-11-27T03:05:31.977Z | 19.0 min |
| shard 7 | 2026-11-27T03:06:34.136Z | 17.5 min |
| shard 8 | 2026-11-27T03:05:24.553Z | 12.8 min |
| shard 9 | 2026-11-27T03:07:47.880Z | 7.5 min |
| shard 10 | 2026-11-27T03:05:22.995Z | 18.0 min |
| shard 11 | 2026-11-27T03:07:41.501Z | 25.5 min |
| shard 12 | 2026-11-27T03:05:32.352Z | 14.5 min |
| shard 13 | 2026-11-27T03:05:45.969Z | 10.4 min |
| shard 14 | 2026-11-27T03:05:51.373Z | 18.9 min |
| shard 15 | 2026-11-27T03:05:51.742Z | 16.8 min |
| shard 16 | 2026-11-27T03:05:42.540Z | 12.5 min |
| repeat | 2026-11-27T03:05:26.279Z | 0.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 82 | 25.7 min | webkit, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 23.0 min | shard 11 |
| `admin-screening.spec.ts` | 64 | 21.2 min | webkit, shard 15 |
| `legal-admin.spec.ts` | 44 | 20.4 min | shard 7 |
| `admin-translations-console.spec.ts` | 46 | 18.8 min | smoke, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 17.8 min | shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 17.2 min | shard 6 |
| `failure-crawl-admin-content.spec.ts` | 18 | 16.7 min | shard 2 |
| `admin-attributes-links.spec.ts` | 34 | 16.0 min | shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 15.0 min | shard 10 |
| `admin-locations.spec.ts` | 44 | 14.9 min | shard 10 |
| `admin-monetisation.spec.ts` | 34 | 13.6 min | smoke, shard 6 |
| `failure-crawl-admin-people.spec.ts` | 14 | 11.9 min | shard 5 |
| `import-security.spec.ts` | 36 | 11.9 min | shard 8 |
| `admin-roles.spec.ts` | 28 | 10.6 min | shard 13 |
| `failure-crawl-admin-catalog.spec.ts` | 18 | 10.2 min | shard 4 |
| `legal-doors.spec.ts` | 34 | 9.5 min | smoke, shard 1 |
| `shell.spec.ts` | 234 | 9.1 min | shard 1 |
| `admin-categories-console.spec.ts` | 34 | 8.8 min | shard 11 |
| `failure-crawl-member-listings.spec.ts` | 10 | 7.2 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 7.2 min | shard 11 |
| `admin-countries.spec.ts` | 18 | 7.0 min | shard 8 |
| `dialogs.spec.ts` | 36 | 6.1 min | webkit, shard 9 |
| `admin-translations-governance.spec.ts` | 20 | 5.9 min | smoke, shard 1 |
| `auth-signout.spec.ts` | 44 | 5.9 min | webkit, shard 5 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.8 min | shard 7 |
| `admin-translations-data.spec.ts` | 10 | 5.3 min | shard 6 |
| `admin-guides.spec.ts` | 14 | 5.0 min | shard 2 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 9 |
| `ad-page.spec.ts` | 104 | 4.7 min | webkit, shard 9 |
| `admin-screening-reject.spec.ts` | 10 | 4.5 min | shard 2 |
| `post-wizard-place.spec.ts` | 40 | 4.4 min | shard 15 |
| `post-wizard-specs.spec.ts` | 82 | 4.1 min | shard 16 |
| `admin-users.spec.ts` | 28 | 4.1 min | shard 13 |
| `post-wizard-where.spec.ts` | 32 | 3.9 min | shard 7 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 14 |
| `photo-pipeline.spec.ts` | 74 | 3.8 min | webkit, shard 12 |
| `mfa-stepup.spec.ts` | 28 | 3.5 min | webkit, shard 15 |
| `admin-categories-home.spec.ts` | 10 | 3.4 min | shard 3 |
| `post-wizard-pricing.spec.ts` | 52 | 2.9 min | shard 4 |
| `my-listings-ad.spec.ts` | 38 | 2.9 min | shard 8 |
| `post-wizard-category.spec.ts` | 54 | 2.7 min | webkit, shard 13 |
| `failure-crawl-public.spec.ts` | 26 | 2.5 min | shard 12 |
| `sage-ad-page.spec.ts` | 30 | 2.5 min | webkit, shard 6 |
| `choice-lists.spec.ts` | 96 | 2.5 min | shard 3 |
| `name-check-queue.spec.ts` | 8 | 2.4 min | smoke, shard 8 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.3 min | shard 9 |
| `posting-routes.spec.ts` | 80 | 2.0 min | shard 16 |
| `failure-crawl-member-public.spec.ts` | 14 | 1.8 min | shard 14 |
| `admin-services.spec.ts` | 10 | 1.8 min | shard 1 |
| `failure-crawl-member-account.spec.ts` | 16 | 1.8 min | shard 15 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 15 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 14 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 4 |
| `sage-tiers.spec.ts` | 52 | 1.5 min | webkit, shard 2 |
| `my-listings-promote.spec.ts` | 10 | 1.4 min | shard 11 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 7 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 10 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.1 min | shard 7 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 12 |
| `page-head.spec.ts` | 4 | 1.0 min | shard 9 |
| `my-listings-page.spec.ts` | 24 | 1.0 min | webkit, shard 10 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 0.9 min | shard 13 |
| `press.spec.ts` | 22 | 0.9 min | shard 16 |
| `my-listings-doors.spec.ts` | 28 | 0.8 min | shard 9 |
| `settings.spec.ts` | 16 | 0.8 min | shard 7 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 8 |
| `staff-gate.spec.ts` | 4 | 0.7 min | shard 11 |
| `layout.spec.ts` | 18 | 0.7 min | webkit, shard 7 |
| `house-style.spec.ts` | 18 | 0.6 min | shard 14 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 13 |
| `breadcrumbs.spec.ts` | 6 | 0.6 min | shard 10 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `overlays.spec.ts` | 8 | 0.6 min | shard 6 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 12 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 16 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 12 |
| `error-reports.spec.ts` | 28 | 0.4 min | shard 15, repeat |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 3 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 4 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 16 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 1 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 13 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 6 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 14 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 15 |
| `submenu.spec.ts` | 14 | 0.2 min | smoke, shard 8 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `shell-bands.spec.ts` | 16 | 0.2 min | smoke, shard 3 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 5 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 2 |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 5 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 10 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 16 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 3 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 12 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 9 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 8 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 13 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 2 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 15 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 14 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 12 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 16 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 7 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 9 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 2 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 13 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 3 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4 |
| `offline.spec.ts` | 2 | 0.0 min | shard 11 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 15 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 6 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 2 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 278.4 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 245.1 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 217.3 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 213.6 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 143.1 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 135.5 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 135.2 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 133.3 s |
| `failure-crawl-admin-content.spec.ts` › FCR-72 /admin/listings/$listingId as staff: loads clean and says every failed read | mobile-360 | 112.5 s |
| `failure-crawl-admin-content.spec.ts` › FCR-70 /admin/ as staff: loads clean and says every failed read | mobile-360 | 106.1 s |
| `failure-crawl-admin-content.spec.ts` › FCR-78 /admin/translations/$lang as staff: loads clean and says every failed read | mobile-360 | 101.5 s |
| `failure-crawl-admin-content.spec.ts` › FCR-75 /admin/legal/$versionId as staff: loads clean and says every failed read | mobile-360 | 98.1 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 86.5 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-57 /admin/packages as staff: loads clean and says every failed read | mobile-360 | 70.6 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 70.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45929211475-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45929211475-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 45929211475-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45929211475-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45929211475-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45929211475-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45929211475-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45929211475-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45929211475-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45929211475-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 26 (pool 4, fresh 22)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 45929211475-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 45929211475-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45929211475-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45929211475-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 45929211475-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 27 user(s) owned by process 45929211475-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 19 (pool 4, fresh 15)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 45929211475-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 34 (pool 4, fresh 30)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 45929211475-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 45929211475-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45929211475-local-repeat
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
[WebServer] [ssr-error] /api/error-reports not signed in Auth session missing!
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
