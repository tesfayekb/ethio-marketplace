# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36313684517 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36313684517
- Commit: `2dda3ab8d4d21265bb8c07663ec974e99e5244c7`
- Attempt: 1
- Written (UTC): 2026-09-27T11:05:15.218Z
- Post-test warnings: 0
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the mobile drawer renders no English fallback — Error: mobile drawer categories: category labels still in English

## Flaky bodies (DEC-078)

### i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the mobile drawer renders no English fallback

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: mobile drawer categories: category labels still in English

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "Construction Material",
+   "Travel & Accommodation",
+ ]
```

Context:

```text
          - link "e2e-post-changed-1-c74y2f" [ref=e190] [cursor=pointer]:
            - /url: /c/e2e-post-changed-1-c74y2f
            - img [ref=e191]
            - generic [ref=e194]: e2e-post-changed-1-c74y2f
        - listitem [ref=e195]:
          - link "e2e-post-5-2-eawwfw" [ref=e196] [cursor=pointer]:
            - /url: /c/e2e-post-5-2-eawwfw
            - img [ref=e197]
            - generic [ref=e200]: e2e-post-5-2-eawwfw
        - listitem [ref=e201]:
          - link "e2e-post-5-2-mmwwqm" [ref=e202] [cursor=pointer]:
            - /url: /c/e2e-post-5-2-mmwwqm
            - img [ref=e203]
            - generic [ref=e206]: e2e-post-5-2-mmwwqm
        - listitem [ref=e207]:
          - link "e2e-post-2-2-8vornt" [ref=e208] [cursor=pointer]:
            - /url: /c/e2e-post-2-2-8vornt
            - img [ref=e209]
            - generic [ref=e212]: e2e-post-2-2-8vornt
```
```
