# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37887614746
- Commit: `38582ff0e5bf206b995eb2c564ab39393b2c6db1`
- Attempt: 1
- Written (UTC): 2026-10-09T05:27:23.803Z
- Passed: 13 · Skipped: 0 · Failed: 16
- Gating failures: 16 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email, changed
- Sources without results: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

89 line(s), 33 message(s): 1 off the allowlist, 32 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 10 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories badHeader` (quiet) | 2 | shard 2, shard 5 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `categories wrongFile` (quiet) | 2 | shard 2, shard 5 |
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
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 1 | shard 6 |

Quiet (allowlisted): digest mismatch ×10 · too many previews ×10 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 1 · Sources: shard 6

```text
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: email, changed · unavailable: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| email | 2026-10-09T05:17:34.078Z | 0.2 min |
| changed | 2026-10-09T05:17:51.750Z | 6.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `feed-index.spec.ts` | 28 | 12.1 min | changed |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `feed-index.spec.ts` › FE-8 the tier sets the rank | mobile-360 | 55.7 s |
| `feed-index.spec.ts` › FE-8 the tier sets the rank | desktop-1280 | 54.1 s |
| `feed-index.spec.ts` › FE-9 an extra place removed or added changes the rows | desktop-1280 | 47.2 s |
| `feed-index.spec.ts` › FE-9 an extra place removed or added changes the rows | mobile-360 | 46.6 s |
| `feed-index.spec.ts` › FE-6 a listing written active is indexed by itself | desktop-1280 | 43.9 s |
| `feed-index.spec.ts` › FE-7 leaving active removes the rows and returning restores them | mobile-360 | 41.3 s |
| `feed-index.spec.ts` › FE-6 a listing written active is indexed by itself | mobile-360 | 40.2 s |
| `feed-index.spec.ts` › FE-7 leaving active removes the rows and returning restores them | desktop-1280 | 38.4 s |
| `feed-index.spec.ts` › FE-10 a category surfaced under a new parent is re-indexed by the sweep | desktop-1280 | 37.1 s |
| `feed-index.spec.ts` › FE-10 a category surfaced under a new parent is re-indexed by the sweep | mobile-360 | 37.1 s |
| `feed-index.spec.ts` › FE-11 a city moved to another region is re-indexed by the sweep | mobile-360 | 26.0 s |
| `feed-index.spec.ts` › FE-11 a city moved to another region is re-indexed by the sweep | desktop-1280 | 25.8 s |
| `feed-index.spec.ts` › FE-1 the refresh writes one row per category key and place key | desktop-1280 | 25.5 s |
| `feed-index.spec.ts` › FE-1 the refresh writes one row per category key and place key | mobile-360 | 24.4 s |
| `feed-index.spec.ts` › FE-12 the reviewer's door to active indexes the listing | desktop-1280 | 23.9 s |

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37887614746-email
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37887614746-changed
```

## feed-index.spec.ts › FEED INDEX › FE-6 a listing written active is indexed by itself

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 22
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|99a556e2-5531-4f96-95a0-6b2338b31961",
-   "00000000-0000-0000-0000-000000000000|a9abb3dc-8e97-4eb1-8925-280169cd3c82",
-   "00000000-0000-0000-0000-000000000000|d087f877-e9f2-41fd-8a3e-655c799b64fa",
-   "4efe1929-527a-43be-9b3a-093ffdb1fd32|00000000-0000-0000-0000-000000000000",
-   "4efe1929-527a-43be-9b3a-093ffdb1fd32|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "4efe1929-527a-43be-9b3a-093ffdb1fd32|99a556e2-5531-4f96-95a0-6b2338b31961",
-   "4efe1929-527a-43be-9b3a-093ffdb1fd32|a9abb3dc-8e97-4eb1-8925-280169cd3c82",
-   "4efe1929-527a-43be-9b3a-093ffdb1fd32|d087f877-e9f2-41fd-8a3e-655c799b64fa",
-   "93941562-0413-4643-a7ab-0d9e7f81cd8c|00000000-0000-0000-0000-000000000000",
-   "93941562-0413-4643-a7ab-0d9e7f81cd8c|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "93941562-0413-4643-a7ab-0d9e7f81cd8c|99a556e2-5531-4f96-95a0-6b2338b31961",
-   "93941562-0413-4643-a7ab-0d9e7f81cd8c|a9abb3dc-8e97-4eb1-8925-280169cd3c82",
-   "93941562-0413-4643-a7ab-0d9e7f81cd8c|d087f877-e9f2-41fd-8a3e-655c799b64fa",
-   "e6c47646-0d74-46be-8b13-43ea65ff836f|00000000-0000-0000-0000-000000000000",
-   "e6c47646-0d74-46be-8b13-43ea65ff836f|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "e6c47646-0d74-46be-8b13-43ea65ff836f|99a556e2-5531-4f96-95a0-6b2338b31961",
-   "e6c47646-0d74-46be-8b13-43ea65ff836f|a9abb3dc-8e97-4eb1-8925-280169cd3c82",
-   "e6c47646-0d74-46be-8b13-43ea65ff836f|d087f877-e9f2-41fd-8a3e-655c799b64fa",
- ]
+ Array []
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 22
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|99a556e2-5531-4f96-95a0-6b2338b31961",
-   "00000000-0000-0000-0000-000000000000|a9abb3dc-8e97-4eb1-8925-280169cd3c82",
-   "00000000-0000-0000-0000-000000000000|d087f877-e9f2-41fd-8a3e-655c799b64fa",
-   "4efe1929-527a-43be-9b3a-093ffdb1fd32|00000000-0000-0000-0000-000000000000",
-   "4efe1929-527a-43be-9b3a-093ffdb1fd32|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "4efe1929-527a-43be-9b3a-093ffdb1fd32|99a556e2-5531-4f96-95a0-6b2338b31961",
-   "4efe1929-527a-43be-9b3a-093ffdb1fd32|a9abb3dc-8e97-4eb1-8925-280169cd3c82",
-   "4efe1929-527a-43be-9b3a-093ffdb1fd32|d087f877-e9f2-41fd-8a3e-655c799b64fa",
-   "93941562-0413-4643-a7ab-0d9e7f81cd8c|00000000-0000-0000-0000-000000000000",
-   "93941562-0413-4643-a7ab-0d9e7f81cd8c|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "93941562-0413-4643-a7ab-0d9e7f81cd8c|99a556e2-5531-4f96-95a0-6b2338b31961",
-   "93941562-0413-4643-a7ab-0d9e7f81cd8c|a9abb3dc-8e97-4eb1-8925-280169cd3c82",
```

Context: context file not found for `feed-index-FEED-INDEX-FE-6-a-listing-written-active-is-indexed-by-itself-mobile-360`

## feed-index.spec.ts › FEED INDEX › FE-7 leaving active removes the rows and returning restores them

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 22
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|7c1aca3f-2c9b-4158-9091-969761130616",
-   "00000000-0000-0000-0000-000000000000|92c6611e-f3d2-4bb9-b774-b2310ca0e622",
-   "00000000-0000-0000-0000-000000000000|ef6809db-d24b-4843-b949-ce95bf55b6ff",
-   "88cc398b-e66e-4dce-9294-45f8cd8062ae|00000000-0000-0000-0000-000000000000",
-   "88cc398b-e66e-4dce-9294-45f8cd8062ae|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "88cc398b-e66e-4dce-9294-45f8cd8062ae|7c1aca3f-2c9b-4158-9091-969761130616",
-   "88cc398b-e66e-4dce-9294-45f8cd8062ae|92c6611e-f3d2-4bb9-b774-b2310ca0e622",
-   "88cc398b-e66e-4dce-9294-45f8cd8062ae|ef6809db-d24b-4843-b949-ce95bf55b6ff",
-   "d002a287-ed5b-42bc-992a-4d66012e7edc|00000000-0000-0000-0000-000000000000",
-   "d002a287-ed5b-42bc-992a-4d66012e7edc|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "d002a287-ed5b-42bc-992a-4d66012e7edc|7c1aca3f-2c9b-4158-9091-969761130616",
-   "d002a287-ed5b-42bc-992a-4d66012e7edc|92c6611e-f3d2-4bb9-b774-b2310ca0e622",
-   "d002a287-ed5b-42bc-992a-4d66012e7edc|ef6809db-d24b-4843-b949-ce95bf55b6ff",
-   "da65d5e5-7680-4894-b3e0-fd1827a41dce|00000000-0000-0000-0000-000000000000",
-   "da65d5e5-7680-4894-b3e0-fd1827a41dce|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "da65d5e5-7680-4894-b3e0-fd1827a41dce|7c1aca3f-2c9b-4158-9091-969761130616",
-   "da65d5e5-7680-4894-b3e0-fd1827a41dce|92c6611e-f3d2-4bb9-b774-b2310ca0e622",
-   "da65d5e5-7680-4894-b3e0-fd1827a41dce|ef6809db-d24b-4843-b949-ce95bf55b6ff",
- ]
+ Array []
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 22
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|7c1aca3f-2c9b-4158-9091-969761130616",
-   "00000000-0000-0000-0000-000000000000|92c6611e-f3d2-4bb9-b774-b2310ca0e622",
-   "00000000-0000-0000-0000-000000000000|ef6809db-d24b-4843-b949-ce95bf55b6ff",
-   "88cc398b-e66e-4dce-9294-45f8cd8062ae|00000000-0000-0000-0000-000000000000",
-   "88cc398b-e66e-4dce-9294-45f8cd8062ae|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "88cc398b-e66e-4dce-9294-45f8cd8062ae|7c1aca3f-2c9b-4158-9091-969761130616",
-   "88cc398b-e66e-4dce-9294-45f8cd8062ae|92c6611e-f3d2-4bb9-b774-b2310ca0e622",
-   "88cc398b-e66e-4dce-9294-45f8cd8062ae|ef6809db-d24b-4843-b949-ce95bf55b6ff",
-   "d002a287-ed5b-42bc-992a-4d66012e7edc|00000000-0000-0000-0000-000000000000",
-   "d002a287-ed5b-42bc-992a-4d66012e7edc|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "d002a287-ed5b-42bc-992a-4d66012e7edc|7c1aca3f-2c9b-4158-9091-969761130616",
-   "d002a287-ed5b-42bc-992a-4d66012e7edc|92c6611e-f3d2-4bb9-b774-b2310ca0e622",
```

Context: context file not found for `feed-index-FEED-INDEX-FE-7-leaving-active-removes-the-rows-and-returning-restores-them-mobile-360`

## feed-index.spec.ts › FEED INDEX › FE-8 the tier sets the rank

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 22
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|576c78de-6efc-44d8-891c-b5e5a079d73b",
-   "00000000-0000-0000-0000-000000000000|7ea4bf24-9be7-43bc-a019-7d55a743217c",
-   "00000000-0000-0000-0000-000000000000|c5c0bb9c-79a7-4b0a-9a63-fc92c92af1e1",
-   "8627d04f-4272-4865-8ea1-ee60ba5314ca|00000000-0000-0000-0000-000000000000",
-   "8627d04f-4272-4865-8ea1-ee60ba5314ca|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "8627d04f-4272-4865-8ea1-ee60ba5314ca|576c78de-6efc-44d8-891c-b5e5a079d73b",
-   "8627d04f-4272-4865-8ea1-ee60ba5314ca|7ea4bf24-9be7-43bc-a019-7d55a743217c",
-   "8627d04f-4272-4865-8ea1-ee60ba5314ca|c5c0bb9c-79a7-4b0a-9a63-fc92c92af1e1",
-   "a0680742-58f3-4349-a0ec-ed4df4ce39dc|00000000-0000-0000-0000-000000000000",
-   "a0680742-58f3-4349-a0ec-ed4df4ce39dc|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "a0680742-58f3-4349-a0ec-ed4df4ce39dc|576c78de-6efc-44d8-891c-b5e5a079d73b",
-   "a0680742-58f3-4349-a0ec-ed4df4ce39dc|7ea4bf24-9be7-43bc-a019-7d55a743217c",
-   "a0680742-58f3-4349-a0ec-ed4df4ce39dc|c5c0bb9c-79a7-4b0a-9a63-fc92c92af1e1",
-   "e1b2a5fc-3079-4869-86f8-8bc0b6138a2d|00000000-0000-0000-0000-000000000000",
-   "e1b2a5fc-3079-4869-86f8-8bc0b6138a2d|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "e1b2a5fc-3079-4869-86f8-8bc0b6138a2d|576c78de-6efc-44d8-891c-b5e5a079d73b",
-   "e1b2a5fc-3079-4869-86f8-8bc0b6138a2d|7ea4bf24-9be7-43bc-a019-7d55a743217c",
-   "e1b2a5fc-3079-4869-86f8-8bc0b6138a2d|c5c0bb9c-79a7-4b0a-9a63-fc92c92af1e1",
- ]
+ Array []
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 22
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|576c78de-6efc-44d8-891c-b5e5a079d73b",
-   "00000000-0000-0000-0000-000000000000|7ea4bf24-9be7-43bc-a019-7d55a743217c",
-   "00000000-0000-0000-0000-000000000000|c5c0bb9c-79a7-4b0a-9a63-fc92c92af1e1",
-   "8627d04f-4272-4865-8ea1-ee60ba5314ca|00000000-0000-0000-0000-000000000000",
-   "8627d04f-4272-4865-8ea1-ee60ba5314ca|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "8627d04f-4272-4865-8ea1-ee60ba5314ca|576c78de-6efc-44d8-891c-b5e5a079d73b",
-   "8627d04f-4272-4865-8ea1-ee60ba5314ca|7ea4bf24-9be7-43bc-a019-7d55a743217c",
-   "8627d04f-4272-4865-8ea1-ee60ba5314ca|c5c0bb9c-79a7-4b0a-9a63-fc92c92af1e1",
-   "a0680742-58f3-4349-a0ec-ed4df4ce39dc|00000000-0000-0000-0000-000000000000",
-   "a0680742-58f3-4349-a0ec-ed4df4ce39dc|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "a0680742-58f3-4349-a0ec-ed4df4ce39dc|576c78de-6efc-44d8-891c-b5e5a079d73b",
-   "a0680742-58f3-4349-a0ec-ed4df4ce39dc|7ea4bf24-9be7-43bc-a019-7d55a743217c",
```

Context: context file not found for `feed-index-FEED-INDEX-FE-8-the-tier-sets-the-rank-mobile-360`

## feed-index.spec.ts › FEED INDEX › FE-9 an extra place removed or added changes the rows

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 18
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|35736393-2997-43df-86cf-10767cf6cdfa",
-   "00000000-0000-0000-0000-000000000000|49286766-a6cd-41a8-a94c-b93f60438b22",
-   "1597d0d4-d993-45ef-b915-e6a7da29849c|00000000-0000-0000-0000-000000000000",
-   "1597d0d4-d993-45ef-b915-e6a7da29849c|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "1597d0d4-d993-45ef-b915-e6a7da29849c|35736393-2997-43df-86cf-10767cf6cdfa",
-   "1597d0d4-d993-45ef-b915-e6a7da29849c|49286766-a6cd-41a8-a94c-b93f60438b22",
-   "8164e8d1-3ffc-4117-b361-b0837848c6ba|00000000-0000-0000-0000-000000000000",
-   "8164e8d1-3ffc-4117-b361-b0837848c6ba|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "8164e8d1-3ffc-4117-b361-b0837848c6ba|35736393-2997-43df-86cf-10767cf6cdfa",
-   "8164e8d1-3ffc-4117-b361-b0837848c6ba|49286766-a6cd-41a8-a94c-b93f60438b22",
-   "a8987449-06f0-4a4e-8496-b32fe3d2b936|00000000-0000-0000-0000-000000000000",
-   "a8987449-06f0-4a4e-8496-b32fe3d2b936|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "a8987449-06f0-4a4e-8496-b32fe3d2b936|35736393-2997-43df-86cf-10767cf6cdfa",
-   "a8987449-06f0-4a4e-8496-b32fe3d2b936|49286766-a6cd-41a8-a94c-b93f60438b22",
- ]
+ Array []
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 18
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|35736393-2997-43df-86cf-10767cf6cdfa",
-   "00000000-0000-0000-0000-000000000000|49286766-a6cd-41a8-a94c-b93f60438b22",
-   "1597d0d4-d993-45ef-b915-e6a7da29849c|00000000-0000-0000-0000-000000000000",
-   "1597d0d4-d993-45ef-b915-e6a7da29849c|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "1597d0d4-d993-45ef-b915-e6a7da29849c|35736393-2997-43df-86cf-10767cf6cdfa",
-   "1597d0d4-d993-45ef-b915-e6a7da29849c|49286766-a6cd-41a8-a94c-b93f60438b22",
-   "8164e8d1-3ffc-4117-b361-b0837848c6ba|00000000-0000-0000-0000-000000000000",
-   "8164e8d1-3ffc-4117-b361-b0837848c6ba|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "8164e8d1-3ffc-4117-b361-b0837848c6ba|35736393-2997-43df-86cf-10767cf6cdfa",
-   "8164e8d1-3ffc-4117-b361-b0837848c6ba|49286766-a6cd-41a8-a94c-b93f60438b22",
-   "a8987449-06f0-4a4e-8496-b32fe3d2b936|00000000-0000-0000-0000-000000000000",
-   "a8987449-06f0-4a4e-8496-b32fe3d2b936|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
```

Context: context file not found for `feed-index-FEED-INDEX-FE-9-an-extra-place-removed-or-added-changes-the-rows-mobile-360`

## feed-index.spec.ts › FEED INDEX › FE-10 a category surfaced under a new parent is re-indexed by the sweep

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBeNull()

Received: {"code": "PGRST202", "details": "Searched for the function public.feed_reindex_sweep with parameter p_limit or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache.", "hint": "Perhaps you meant to call the function public.feed_index_check", "message": "Could not find the function public.feed_reindex_sweep(p_limit) in the schema cache"}
--- further error 1 ---
Error: expect(received).toBeNull()

Received: {"code": "PGRST202", "details": "Searched for the function public.feed_reindex_sweep with parameter p_limit or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache.", "hint": "Perhaps you meant to call the function public.feed_index_check", "message": "Could not find the function public.feed_reindex_sweep(p_limit) in the schema cache"}

  152 |         return predicate(await rowsOf(listingId));
  153 |       })
> 154 |       .toBe(true);
      |        ^
  155 |   }
  156 |
  157 |   async function setListing(listingId: string, patch: Record<string, unknown>): Promise<void> {
    at sweepUntil (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-index.spec.ts:154:8)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-index.spec.ts:342:11
```

Context: context file not found for `feed-index-FEED-INDEX-FE-10-a-category-surfaced-under-a-new-parent-is-re-indexed-by-the-sweep-mobile-360`

## feed-index.spec.ts › FEED INDEX › FE-11 a city moved to another region is re-indexed by the sweep

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBeNull()

Received: {"code": "PGRST202", "details": "Searched for the function public.feed_reindex_sweep with parameter p_limit or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache.", "hint": "Perhaps you meant to call the function public.feed_index_check", "message": "Could not find the function public.feed_reindex_sweep(p_limit) in the schema cache"}
--- further error 1 ---
Error: expect(received).toBeNull()

Received: {"code": "PGRST202", "details": "Searched for the function public.feed_reindex_sweep with parameter p_limit or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache.", "hint": "Perhaps you meant to call the function public.feed_index_check", "message": "Could not find the function public.feed_reindex_sweep(p_limit) in the schema cache"}

  152 |         return predicate(await rowsOf(listingId));
  153 |       })
> 154 |       .toBe(true);
      |        ^
  155 |   }
  156 |
  157 |   async function setListing(listingId: string, patch: Record<string, unknown>): Promise<void> {
    at sweepUntil (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-index.spec.ts:154:8)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-index.spec.ts:382:11
```

Context: context file not found for `feed-index-FEED-INDEX-FE-11-a-city-moved-to-another-region-is-re-indexed-by-the-sweep-mobile-360`

## feed-index.spec.ts › FEED INDEX › FE-12 the reviewer's door to active indexes the listing

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 18
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|5f8a6d53-2a5b-4448-a503-08e90a9a7fd1",
-   "00000000-0000-0000-0000-000000000000|72ddc139-be2e-4d95-b49a-de1b3d2e4d02",
-   "45fc955e-016d-4dfe-a86e-c7450377ba33|00000000-0000-0000-0000-000000000000",
-   "45fc955e-016d-4dfe-a86e-c7450377ba33|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "45fc955e-016d-4dfe-a86e-c7450377ba33|5f8a6d53-2a5b-4448-a503-08e90a9a7fd1",
-   "45fc955e-016d-4dfe-a86e-c7450377ba33|72ddc139-be2e-4d95-b49a-de1b3d2e4d02",
-   "5d0d04e7-463e-4c91-837a-481dfabafeba|00000000-0000-0000-0000-000000000000",
-   "5d0d04e7-463e-4c91-837a-481dfabafeba|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "5d0d04e7-463e-4c91-837a-481dfabafeba|5f8a6d53-2a5b-4448-a503-08e90a9a7fd1",
-   "5d0d04e7-463e-4c91-837a-481dfabafeba|72ddc139-be2e-4d95-b49a-de1b3d2e4d02",
-   "e9d146ea-16af-43b6-b589-92a02650ec59|00000000-0000-0000-0000-000000000000",
-   "e9d146ea-16af-43b6-b589-92a02650ec59|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "e9d146ea-16af-43b6-b589-92a02650ec59|5f8a6d53-2a5b-4448-a503-08e90a9a7fd1",
-   "e9d146ea-16af-43b6-b589-92a02650ec59|72ddc139-be2e-4d95-b49a-de1b3d2e4d02",
- ]
+ Array []
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 18
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|5f8a6d53-2a5b-4448-a503-08e90a9a7fd1",
-   "00000000-0000-0000-0000-000000000000|72ddc139-be2e-4d95-b49a-de1b3d2e4d02",
-   "45fc955e-016d-4dfe-a86e-c7450377ba33|00000000-0000-0000-0000-000000000000",
-   "45fc955e-016d-4dfe-a86e-c7450377ba33|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "45fc955e-016d-4dfe-a86e-c7450377ba33|5f8a6d53-2a5b-4448-a503-08e90a9a7fd1",
-   "45fc955e-016d-4dfe-a86e-c7450377ba33|72ddc139-be2e-4d95-b49a-de1b3d2e4d02",
-   "5d0d04e7-463e-4c91-837a-481dfabafeba|00000000-0000-0000-0000-000000000000",
-   "5d0d04e7-463e-4c91-837a-481dfabafeba|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "5d0d04e7-463e-4c91-837a-481dfabafeba|5f8a6d53-2a5b-4448-a503-08e90a9a7fd1",
-   "5d0d04e7-463e-4c91-837a-481dfabafeba|72ddc139-be2e-4d95-b49a-de1b3d2e4d02",
-   "e9d146ea-16af-43b6-b589-92a02650ec59|00000000-0000-0000-0000-000000000000",
-   "e9d146ea-16af-43b6-b589-92a02650ec59|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
```

Context: context file not found for `feed-index-FEED-INDEX-FE-12-the-reviewer-s-door-to-active-indexes-the-listing-mobile-360`

## feed-index.spec.ts › FEED INDEX › FE-13 the daily check writes its counts

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBeNull()

Received: {"code": "PGRST202", "details": "Searched for the function public.feed_index_check_sweep without parameters or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache.", "hint": "Perhaps you meant to call the function public.feed_index_check", "message": "Could not find the function public.feed_index_check_sweep without parameters in the schema cache"}
--- further error 1 ---
Error: expect(received).toBeNull()

Received: {"code": "PGRST202", "details": "Searched for the function public.feed_index_check_sweep without parameters or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache.", "hint": "Perhaps you meant to call the function public.feed_index_check", "message": "Could not find the function public.feed_index_check_sweep without parameters in the schema cache"}

  415 |     const started = Date.now();
  416 |     const { data, error } = await adminClient().rpc("feed_index_check_sweep");
> 417 |     expect(error).toBeNull();
      |                   ^
  418 |     const result = data as Record<string, number>;
  419 |     for (const key of [
  420 |       "active_listings",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-index.spec.ts:417:19
```

Context: context file not found for `feed-index-FEED-INDEX-FE-13-the-daily-check-writes-its-counts-mobile-360`

## feed-index.spec.ts › FEED INDEX › FE-6 a listing written active is indexed by itself

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 22
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|6d838998-46dc-4282-8604-0960072c32d0",
-   "00000000-0000-0000-0000-000000000000|75851709-399c-4020-a9da-ea1065de7bdb",
-   "00000000-0000-0000-0000-000000000000|ff84fd48-6b7b-4ae5-bf45-4fa677fe243d",
-   "010f4820-4d7b-42fe-9d32-ad207ff57bc1|00000000-0000-0000-0000-000000000000",
-   "010f4820-4d7b-42fe-9d32-ad207ff57bc1|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "010f4820-4d7b-42fe-9d32-ad207ff57bc1|6d838998-46dc-4282-8604-0960072c32d0",
-   "010f4820-4d7b-42fe-9d32-ad207ff57bc1|75851709-399c-4020-a9da-ea1065de7bdb",
-   "010f4820-4d7b-42fe-9d32-ad207ff57bc1|ff84fd48-6b7b-4ae5-bf45-4fa677fe243d",
-   "3fdd8c21-76e1-47c9-be4a-85e82d6bea78|00000000-0000-0000-0000-000000000000",
-   "3fdd8c21-76e1-47c9-be4a-85e82d6bea78|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "3fdd8c21-76e1-47c9-be4a-85e82d6bea78|6d838998-46dc-4282-8604-0960072c32d0",
-   "3fdd8c21-76e1-47c9-be4a-85e82d6bea78|75851709-399c-4020-a9da-ea1065de7bdb",
-   "3fdd8c21-76e1-47c9-be4a-85e82d6bea78|ff84fd48-6b7b-4ae5-bf45-4fa677fe243d",
-   "d15f03ff-22c2-4ca9-a78d-9abf33f5c21a|00000000-0000-0000-0000-000000000000",
-   "d15f03ff-22c2-4ca9-a78d-9abf33f5c21a|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "d15f03ff-22c2-4ca9-a78d-9abf33f5c21a|6d838998-46dc-4282-8604-0960072c32d0",
-   "d15f03ff-22c2-4ca9-a78d-9abf33f5c21a|75851709-399c-4020-a9da-ea1065de7bdb",
-   "d15f03ff-22c2-4ca9-a78d-9abf33f5c21a|ff84fd48-6b7b-4ae5-bf45-4fa677fe243d",
- ]
+ Array []
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 22
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|6d838998-46dc-4282-8604-0960072c32d0",
-   "00000000-0000-0000-0000-000000000000|75851709-399c-4020-a9da-ea1065de7bdb",
-   "00000000-0000-0000-0000-000000000000|ff84fd48-6b7b-4ae5-bf45-4fa677fe243d",
-   "010f4820-4d7b-42fe-9d32-ad207ff57bc1|00000000-0000-0000-0000-000000000000",
-   "010f4820-4d7b-42fe-9d32-ad207ff57bc1|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "010f4820-4d7b-42fe-9d32-ad207ff57bc1|6d838998-46dc-4282-8604-0960072c32d0",
-   "010f4820-4d7b-42fe-9d32-ad207ff57bc1|75851709-399c-4020-a9da-ea1065de7bdb",
-   "010f4820-4d7b-42fe-9d32-ad207ff57bc1|ff84fd48-6b7b-4ae5-bf45-4fa677fe243d",
-   "3fdd8c21-76e1-47c9-be4a-85e82d6bea78|00000000-0000-0000-0000-000000000000",
-   "3fdd8c21-76e1-47c9-be4a-85e82d6bea78|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "3fdd8c21-76e1-47c9-be4a-85e82d6bea78|6d838998-46dc-4282-8604-0960072c32d0",
-   "3fdd8c21-76e1-47c9-be4a-85e82d6bea78|75851709-399c-4020-a9da-ea1065de7bdb",
```

Context: context file not found for `feed-index-FEED-INDEX-FE-6-a-listing-written-active-is-indexed-by-itself-desktop-1280`

## feed-index.spec.ts › FEED INDEX › FE-7 leaving active removes the rows and returning restores them

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 22
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|3784576f-5b67-4190-81b7-d8c30c0e70e4",
-   "00000000-0000-0000-0000-000000000000|9532c1d4-b0b6-4b8a-85f7-1ea53d549aeb",
-   "00000000-0000-0000-0000-000000000000|a0328634-c5de-4cf9-b13f-f29c76a80e4a",
-   "1ae1b101-34a3-43e2-b733-f4feb82f2233|00000000-0000-0000-0000-000000000000",
-   "1ae1b101-34a3-43e2-b733-f4feb82f2233|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "1ae1b101-34a3-43e2-b733-f4feb82f2233|3784576f-5b67-4190-81b7-d8c30c0e70e4",
-   "1ae1b101-34a3-43e2-b733-f4feb82f2233|9532c1d4-b0b6-4b8a-85f7-1ea53d549aeb",
-   "1ae1b101-34a3-43e2-b733-f4feb82f2233|a0328634-c5de-4cf9-b13f-f29c76a80e4a",
-   "271674be-e171-449e-b034-e231e42d5d21|00000000-0000-0000-0000-000000000000",
-   "271674be-e171-449e-b034-e231e42d5d21|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "271674be-e171-449e-b034-e231e42d5d21|3784576f-5b67-4190-81b7-d8c30c0e70e4",
-   "271674be-e171-449e-b034-e231e42d5d21|9532c1d4-b0b6-4b8a-85f7-1ea53d549aeb",
-   "271674be-e171-449e-b034-e231e42d5d21|a0328634-c5de-4cf9-b13f-f29c76a80e4a",
-   "2b5708ad-65d4-4e0b-bfee-af2b04b6be05|00000000-0000-0000-0000-000000000000",
-   "2b5708ad-65d4-4e0b-bfee-af2b04b6be05|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "2b5708ad-65d4-4e0b-bfee-af2b04b6be05|3784576f-5b67-4190-81b7-d8c30c0e70e4",
-   "2b5708ad-65d4-4e0b-bfee-af2b04b6be05|9532c1d4-b0b6-4b8a-85f7-1ea53d549aeb",
-   "2b5708ad-65d4-4e0b-bfee-af2b04b6be05|a0328634-c5de-4cf9-b13f-f29c76a80e4a",
- ]
+ Array []
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 22
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|3784576f-5b67-4190-81b7-d8c30c0e70e4",
-   "00000000-0000-0000-0000-000000000000|9532c1d4-b0b6-4b8a-85f7-1ea53d549aeb",
-   "00000000-0000-0000-0000-000000000000|a0328634-c5de-4cf9-b13f-f29c76a80e4a",
-   "1ae1b101-34a3-43e2-b733-f4feb82f2233|00000000-0000-0000-0000-000000000000",
-   "1ae1b101-34a3-43e2-b733-f4feb82f2233|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "1ae1b101-34a3-43e2-b733-f4feb82f2233|3784576f-5b67-4190-81b7-d8c30c0e70e4",
-   "1ae1b101-34a3-43e2-b733-f4feb82f2233|9532c1d4-b0b6-4b8a-85f7-1ea53d549aeb",
-   "1ae1b101-34a3-43e2-b733-f4feb82f2233|a0328634-c5de-4cf9-b13f-f29c76a80e4a",
-   "271674be-e171-449e-b034-e231e42d5d21|00000000-0000-0000-0000-000000000000",
-   "271674be-e171-449e-b034-e231e42d5d21|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "271674be-e171-449e-b034-e231e42d5d21|3784576f-5b67-4190-81b7-d8c30c0e70e4",
-   "271674be-e171-449e-b034-e231e42d5d21|9532c1d4-b0b6-4b8a-85f7-1ea53d549aeb",
```

Context: context file not found for `feed-index-FEED-INDEX-FE-7-leaving-active-removes-the-rows-and-returning-restores-them-desktop-1280`

## feed-index.spec.ts › FEED INDEX › FE-8 the tier sets the rank

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 22
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|07af5685-03cd-48c0-84e4-f98779eaeb8f",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|54865474-f814-40b9-982c-77fccee38ef7",
-   "00000000-0000-0000-0000-000000000000|7eae0c4e-0f42-4a0b-90b1-acb068c6af5b",
-   "a32b33bb-4abd-43d9-9cfc-80f71a78d723|00000000-0000-0000-0000-000000000000",
-   "a32b33bb-4abd-43d9-9cfc-80f71a78d723|07af5685-03cd-48c0-84e4-f98779eaeb8f",
-   "a32b33bb-4abd-43d9-9cfc-80f71a78d723|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "a32b33bb-4abd-43d9-9cfc-80f71a78d723|54865474-f814-40b9-982c-77fccee38ef7",
-   "a32b33bb-4abd-43d9-9cfc-80f71a78d723|7eae0c4e-0f42-4a0b-90b1-acb068c6af5b",
-   "c5fb54e8-2870-4e03-922a-c41f93e2c11c|00000000-0000-0000-0000-000000000000",
-   "c5fb54e8-2870-4e03-922a-c41f93e2c11c|07af5685-03cd-48c0-84e4-f98779eaeb8f",
-   "c5fb54e8-2870-4e03-922a-c41f93e2c11c|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "c5fb54e8-2870-4e03-922a-c41f93e2c11c|54865474-f814-40b9-982c-77fccee38ef7",
-   "c5fb54e8-2870-4e03-922a-c41f93e2c11c|7eae0c4e-0f42-4a0b-90b1-acb068c6af5b",
-   "fb9e5ede-1491-42a6-ac4c-d41b8d4fd7d3|00000000-0000-0000-0000-000000000000",
-   "fb9e5ede-1491-42a6-ac4c-d41b8d4fd7d3|07af5685-03cd-48c0-84e4-f98779eaeb8f",
-   "fb9e5ede-1491-42a6-ac4c-d41b8d4fd7d3|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "fb9e5ede-1491-42a6-ac4c-d41b8d4fd7d3|54865474-f814-40b9-982c-77fccee38ef7",
-   "fb9e5ede-1491-42a6-ac4c-d41b8d4fd7d3|7eae0c4e-0f42-4a0b-90b1-acb068c6af5b",
- ]
+ Array []
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 22
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|07af5685-03cd-48c0-84e4-f98779eaeb8f",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|54865474-f814-40b9-982c-77fccee38ef7",
-   "00000000-0000-0000-0000-000000000000|7eae0c4e-0f42-4a0b-90b1-acb068c6af5b",
-   "a32b33bb-4abd-43d9-9cfc-80f71a78d723|00000000-0000-0000-0000-000000000000",
-   "a32b33bb-4abd-43d9-9cfc-80f71a78d723|07af5685-03cd-48c0-84e4-f98779eaeb8f",
-   "a32b33bb-4abd-43d9-9cfc-80f71a78d723|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "a32b33bb-4abd-43d9-9cfc-80f71a78d723|54865474-f814-40b9-982c-77fccee38ef7",
-   "a32b33bb-4abd-43d9-9cfc-80f71a78d723|7eae0c4e-0f42-4a0b-90b1-acb068c6af5b",
-   "c5fb54e8-2870-4e03-922a-c41f93e2c11c|00000000-0000-0000-0000-000000000000",
-   "c5fb54e8-2870-4e03-922a-c41f93e2c11c|07af5685-03cd-48c0-84e4-f98779eaeb8f",
-   "c5fb54e8-2870-4e03-922a-c41f93e2c11c|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "c5fb54e8-2870-4e03-922a-c41f93e2c11c|54865474-f814-40b9-982c-77fccee38ef7",
```

Context: context file not found for `feed-index-FEED-INDEX-FE-8-the-tier-sets-the-rank-desktop-1280`

## feed-index.spec.ts › FEED INDEX › FE-9 an extra place removed or added changes the rows

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 18
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|703a0298-c004-4bb6-90cc-8a5a41610ac9",
-   "00000000-0000-0000-0000-000000000000|760e281a-66f5-4c18-8eb7-606d70d8f0d0",
-   "191ac183-aeab-4a98-9dd2-040ab71debfa|00000000-0000-0000-0000-000000000000",
-   "191ac183-aeab-4a98-9dd2-040ab71debfa|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "191ac183-aeab-4a98-9dd2-040ab71debfa|703a0298-c004-4bb6-90cc-8a5a41610ac9",
-   "191ac183-aeab-4a98-9dd2-040ab71debfa|760e281a-66f5-4c18-8eb7-606d70d8f0d0",
-   "5828b228-ae68-49a7-a8a6-0682ba48fd58|00000000-0000-0000-0000-000000000000",
-   "5828b228-ae68-49a7-a8a6-0682ba48fd58|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "5828b228-ae68-49a7-a8a6-0682ba48fd58|703a0298-c004-4bb6-90cc-8a5a41610ac9",
-   "5828b228-ae68-49a7-a8a6-0682ba48fd58|760e281a-66f5-4c18-8eb7-606d70d8f0d0",
-   "e15ec654-5ece-41b2-9084-fe6423c7de38|00000000-0000-0000-0000-000000000000",
-   "e15ec654-5ece-41b2-9084-fe6423c7de38|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "e15ec654-5ece-41b2-9084-fe6423c7de38|703a0298-c004-4bb6-90cc-8a5a41610ac9",
-   "e15ec654-5ece-41b2-9084-fe6423c7de38|760e281a-66f5-4c18-8eb7-606d70d8f0d0",
- ]
+ Array []
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 18
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|703a0298-c004-4bb6-90cc-8a5a41610ac9",
-   "00000000-0000-0000-0000-000000000000|760e281a-66f5-4c18-8eb7-606d70d8f0d0",
-   "191ac183-aeab-4a98-9dd2-040ab71debfa|00000000-0000-0000-0000-000000000000",
-   "191ac183-aeab-4a98-9dd2-040ab71debfa|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "191ac183-aeab-4a98-9dd2-040ab71debfa|703a0298-c004-4bb6-90cc-8a5a41610ac9",
-   "191ac183-aeab-4a98-9dd2-040ab71debfa|760e281a-66f5-4c18-8eb7-606d70d8f0d0",
-   "5828b228-ae68-49a7-a8a6-0682ba48fd58|00000000-0000-0000-0000-000000000000",
-   "5828b228-ae68-49a7-a8a6-0682ba48fd58|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "5828b228-ae68-49a7-a8a6-0682ba48fd58|703a0298-c004-4bb6-90cc-8a5a41610ac9",
-   "5828b228-ae68-49a7-a8a6-0682ba48fd58|760e281a-66f5-4c18-8eb7-606d70d8f0d0",
-   "e15ec654-5ece-41b2-9084-fe6423c7de38|00000000-0000-0000-0000-000000000000",
-   "e15ec654-5ece-41b2-9084-fe6423c7de38|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
```

Context: context file not found for `feed-index-FEED-INDEX-FE-9-an-extra-place-removed-or-added-changes-the-rows-desktop-1280`

## feed-index.spec.ts › FEED INDEX › FE-10 a category surfaced under a new parent is re-indexed by the sweep

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toBeNull()

Received: {"code": "PGRST202", "details": "Searched for the function public.feed_reindex_sweep with parameter p_limit or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache.", "hint": "Perhaps you meant to call the function public.feed_index_check", "message": "Could not find the function public.feed_reindex_sweep(p_limit) in the schema cache"}
--- further error 1 ---
Error: expect(received).toBeNull()

Received: {"code": "PGRST202", "details": "Searched for the function public.feed_reindex_sweep with parameter p_limit or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache.", "hint": "Perhaps you meant to call the function public.feed_index_check", "message": "Could not find the function public.feed_reindex_sweep(p_limit) in the schema cache"}

  152 |         return predicate(await rowsOf(listingId));
  153 |       })
> 154 |       .toBe(true);
      |        ^
  155 |   }
  156 |
  157 |   async function setListing(listingId: string, patch: Record<string, unknown>): Promise<void> {
    at sweepUntil (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-index.spec.ts:154:8)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-index.spec.ts:342:11
```

Context: context file not found for `feed-index-FEED-INDEX-FE-10-a-category-surfaced-under-a-new-parent-is-re-indexed-by-the-sweep-desktop-1280`

## feed-index.spec.ts › FEED INDEX › FE-11 a city moved to another region is re-indexed by the sweep

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toBeNull()

Received: {"code": "PGRST202", "details": "Searched for the function public.feed_reindex_sweep with parameter p_limit or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache.", "hint": "Perhaps you meant to call the function public.feed_index_check", "message": "Could not find the function public.feed_reindex_sweep(p_limit) in the schema cache"}
--- further error 1 ---
Error: expect(received).toBeNull()

Received: {"code": "PGRST202", "details": "Searched for the function public.feed_reindex_sweep with parameter p_limit or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache.", "hint": "Perhaps you meant to call the function public.feed_index_check", "message": "Could not find the function public.feed_reindex_sweep(p_limit) in the schema cache"}

  152 |         return predicate(await rowsOf(listingId));
  153 |       })
> 154 |       .toBe(true);
      |        ^
  155 |   }
  156 |
  157 |   async function setListing(listingId: string, patch: Record<string, unknown>): Promise<void> {
    at sweepUntil (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-index.spec.ts:154:8)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-index.spec.ts:382:11
```

Context: context file not found for `feed-index-FEED-INDEX-FE-11-a-city-moved-to-another-region-is-re-indexed-by-the-sweep-desktop-1280`

## feed-index.spec.ts › FEED INDEX › FE-12 the reviewer's door to active indexes the listing

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 18
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|1f9b3208-8667-4b47-9361-ba198f9b5bd6",
-   "00000000-0000-0000-0000-000000000000|538f0839-ebe3-48ed-bc16-0754d15aa0c9",
-   "66d0065b-515d-41d2-876f-4b4aaee2ba33|00000000-0000-0000-0000-000000000000",
-   "66d0065b-515d-41d2-876f-4b4aaee2ba33|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "66d0065b-515d-41d2-876f-4b4aaee2ba33|1f9b3208-8667-4b47-9361-ba198f9b5bd6",
-   "66d0065b-515d-41d2-876f-4b4aaee2ba33|538f0839-ebe3-48ed-bc16-0754d15aa0c9",
-   "b744ed5c-1c02-4cfe-a91a-b5f95e0a0e4f|00000000-0000-0000-0000-000000000000",
-   "b744ed5c-1c02-4cfe-a91a-b5f95e0a0e4f|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "b744ed5c-1c02-4cfe-a91a-b5f95e0a0e4f|1f9b3208-8667-4b47-9361-ba198f9b5bd6",
-   "b744ed5c-1c02-4cfe-a91a-b5f95e0a0e4f|538f0839-ebe3-48ed-bc16-0754d15aa0c9",
-   "dc94bd3f-fbe9-4946-b453-96c12d04edee|00000000-0000-0000-0000-000000000000",
-   "dc94bd3f-fbe9-4946-b453-96c12d04edee|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "dc94bd3f-fbe9-4946-b453-96c12d04edee|1f9b3208-8667-4b47-9361-ba198f9b5bd6",
-   "dc94bd3f-fbe9-4946-b453-96c12d04edee|538f0839-ebe3-48ed-bc16-0754d15aa0c9",
- ]
+ Array []
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 18
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|1f9b3208-8667-4b47-9361-ba198f9b5bd6",
-   "00000000-0000-0000-0000-000000000000|538f0839-ebe3-48ed-bc16-0754d15aa0c9",
-   "66d0065b-515d-41d2-876f-4b4aaee2ba33|00000000-0000-0000-0000-000000000000",
-   "66d0065b-515d-41d2-876f-4b4aaee2ba33|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "66d0065b-515d-41d2-876f-4b4aaee2ba33|1f9b3208-8667-4b47-9361-ba198f9b5bd6",
-   "66d0065b-515d-41d2-876f-4b4aaee2ba33|538f0839-ebe3-48ed-bc16-0754d15aa0c9",
-   "b744ed5c-1c02-4cfe-a91a-b5f95e0a0e4f|00000000-0000-0000-0000-000000000000",
-   "b744ed5c-1c02-4cfe-a91a-b5f95e0a0e4f|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "b744ed5c-1c02-4cfe-a91a-b5f95e0a0e4f|1f9b3208-8667-4b47-9361-ba198f9b5bd6",
-   "b744ed5c-1c02-4cfe-a91a-b5f95e0a0e4f|538f0839-ebe3-48ed-bc16-0754d15aa0c9",
-   "dc94bd3f-fbe9-4946-b453-96c12d04edee|00000000-0000-0000-0000-000000000000",
-   "dc94bd3f-fbe9-4946-b453-96c12d04edee|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
```

Context: context file not found for `feed-index-FEED-INDEX-FE-12-the-reviewer-s-door-to-active-indexes-the-listing-desktop-1280`

## feed-index.spec.ts › FEED INDEX › FE-13 the daily check writes its counts

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toBeNull()

Received: {"code": "PGRST202", "details": "Searched for the function public.feed_index_check_sweep without parameters or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache.", "hint": "Perhaps you meant to call the function public.feed_index_check", "message": "Could not find the function public.feed_index_check_sweep without parameters in the schema cache"}
--- further error 1 ---
Error: expect(received).toBeNull()

Received: {"code": "PGRST202", "details": "Searched for the function public.feed_index_check_sweep without parameters or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache.", "hint": "Perhaps you meant to call the function public.feed_index_check", "message": "Could not find the function public.feed_index_check_sweep without parameters in the schema cache"}

  415 |     const started = Date.now();
  416 |     const { data, error } = await adminClient().rpc("feed_index_check_sweep");
> 417 |     expect(error).toBeNull();
      |                   ^
  418 |     const result = data as Record<string, number>;
  419 |     for (const key of [
  420 |       "active_listings",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-index.spec.ts:417:19
```

Context: context file not found for `feed-index-FEED-INDEX-FE-13-the-daily-check-writes-its-counts-desktop-1280`

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[a11y] wizard-3 desktop-1280 serious=0 critical=0
[a11y] wizard-5 desktop-1280 serious=0 critical=0
  ✓  100 [desktop-1280] › e2e/a11y.spec.ts:65:3 › A11Y SMOKE (DEC-084, gating) › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y (15.0s)
  ✓  101 [desktop-1280] › e2e/auth-signout.spec.ts:66:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (11.7s)
  ✓  102 [desktop-1280] › e2e/auth-signout.spec.ts:90:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (8.1s)
  ✓  103 [desktop-1280] › e2e/auth-signout.spec.ts:102:3 › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin (9.0s)
  ✓  104 [desktop-1280] › e2e/auth-signout.spec.ts:124:3 › U0j sign-out hard reset › SO-3b reload path: a cleared token means /admin never renders on mount (7.9s)
  ✓  105 [desktop-1280] › e2e/auth-signout.spec.ts:149:3 › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI (9.2s)
  ✓  106 [desktop-1280] › e2e/auth-signout.spec.ts:272:3 › U0k session policy › SP-1 idle: the warning appears, then the session is hard-reset (12.6s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   70 [mobile-360] › e2e/admin-attributes-library.spec.ts:1065:3 › C3 attributes console › AT-18 the scoped export carries the subtree only, with origin (10.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37887614746-1-2822-3-le9ewl@ethio-e2e.invalid)
  ✓   72 [mobile-360] › e2e/admin-attributes-library.spec.ts:1127:3 › C3 attributes console › AT-19 an inherited row has no write verb and the write RPCs refuse it (10.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37887614746-1-2822-3-le9ewl@ethio-e2e.invalid)
  ✓   71 [mobile-360] › e2e/admin-attributes-safety.spec.ts:150:3 › Bundle 7 attribute safety › AT-73 Remove from a category names the listings that hold an answer, and removes (29.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37887614746-1-2822-2-is4rsc@ethio-e2e.invalid)
  ✓   73 [mobile-360] › e2e/admin-attributes-library.spec.ts:1215:3 › C3 attributes console › AT-36 a secondary parent confers nothing, a primary parent confers (14.0s)
  ✓   74 [mobile-360] › e2e/admin-attributes-safety.spec.ts:197:3 › Bundle 7 attribute safety › AT-73b a failed holders read shows its error, keeps the confirm disabled and removes nothing (7.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37887614746-1-2822-2-is4rsc@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (16) ---
  ✘   53 [mobile-360] › e2e/feed-index.spec.ts:259:3 › FEED INDEX › FE-6 a listing written active is indexed by itself (19.7s)
  ✘   58 [mobile-360] › e2e/feed-index.spec.ts:259:3 › FEED INDEX › FE-6 a listing written active is indexed by itself (retry #1) (23.4s)
  ✘   62 [mobile-360] › e2e/feed-index.spec.ts:268:3 › FEED INDEX › FE-7 leaving active removes the rows and returning restores them (32.5s)
  ✘   64 [mobile-360] › e2e/feed-index.spec.ts:268:3 › FEED INDEX › FE-7 leaving active removes the rows and returning restores them (retry #1) (27.7s)
  ✘   65 [mobile-360] › e2e/feed-index.spec.ts:282:3 › FEED INDEX › FE-8 the tier sets the rank (22.2s)
  ✘   69 [mobile-360] › e2e/feed-index.spec.ts:282:3 › FEED INDEX › FE-8 the tier sets the rank (retry #1) (21.0s)
  ✘   70 [mobile-360] › e2e/feed-index.spec.ts:297:3 › FEED INDEX › FE-9 an extra place removed or added changes the rows (19.6s)
  ✘   74 [mobile-360] › e2e/feed-index.spec.ts:297:3 › FEED INDEX › FE-9 an extra place removed or added changes the rows (retry #1) (13.6s)
  ✘   77 [mobile-360] › e2e/feed-index.spec.ts:316:3 › FEED INDEX › FE-10 a category surfaced under a new parent is re-indexed by the sweep (13.2s)
  ✘   80 [mobile-360] › e2e/feed-index.spec.ts:316:3 › FEED INDEX › FE-10 a category surfaced under a new parent is re-indexed by the sweep (retry #1) (11.8s)
  ✘   83 [mobile-360] › e2e/feed-index.spec.ts:355:3 › FEED INDEX › FE-11 a city moved to another region is re-indexed by the sweep (14.4s)
  ✘   85 [mobile-360] › e2e/feed-index.spec.ts:355:3 › FEED INDEX › FE-11 a city moved to another region is re-indexed by the sweep (retry #1) (11.9s)
  ✘   91 [mobile-360] › e2e/feed-index.spec.ts:390:3 › FEED INDEX › FE-12 the reviewer's door to active indexes the listing (14.4s)
  ✘   96 [mobile-360] › e2e/feed-index.spec.ts:390:3 › FEED INDEX › FE-12 the reviewer's door to active indexes the listing (retry #1) (13.4s)
  ✘   97 [mobile-360] › e2e/feed-index.spec.ts:414:3 › FEED INDEX › FE-13 the daily check writes its counts (354ms)
  ✘   98 [mobile-360] › e2e/feed-index.spec.ts:414:3 › FEED INDEX › FE-13 the daily check writes its counts (retry #1) (388ms)
--- final 10 lines ---
✓  120 [mobile-360] › e2e/mfa-stepup.spec.ts:323:3 › FIX-SCAN-1 step-up abort › MF-7b cancelling the prompt releases the caller and writes nothing @private-identity (11.3s)
  ✓  119 [mobile-360] › e2e/photo-pipeline.spec.ts:174:3 › PHOTO PIPELINE › PP-3 a PDF renamed .jpg is refused unsupportedFormat (15.5s)
  ✓  121 [mobile-360] › e2e/mfa-stepup.spec.ts:355:3 › FIX-SCAN-1 step-up abort › MF-7c a no-factor identity is released with the hint @private-identity (5.2s)
  ✓  122 [mobile-360] › e2e/photo-pipeline.spec.ts:188:3 › PHOTO PIPELINE › PP-4 a variant over its size dial is refused by name (12.5s)
  ✓  123 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:201:3 › POSTING WIZARD — bundle 2 place and contact › PW-113 directions are saved, survive a pin move, and refuse a phone number (15.9s)
  ✓  124 [mobile-360] › e2e/photo-pipeline.spec.ts:207:3 › PHOTO PIPELINE › PP-5 the policy pass refuses the cover and stores nothing (11.0s)
  ✓  125 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:242:3 › POSTING WIZARD — bundle 2 place and contact › PW-129 Next waits for the identity read instead of refusing (13.6s)
  ✓  126 [mobile-360] › e2e/photo-pipeline.spec.ts:223:3 › PHOTO PIPELINE › PP-6 another seller's listing is a 403 (19.5s)
  ✓  127 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:281:3 › POSTING WIZARD — bundle 2 place and contact › PW-134 names typed during the identity read survive it and are saved (18.2s)
```

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   39 [mobile-360] › e2e/post-wizard-specs.spec.ts:1206:3 › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion (20.2s)
  ✓   40 [mobile-360] › e2e/post-wizard-units.spec.ts:103:3 › POSTING WIZARD — UNITS › PW-175 the price page asks the unit of sale above the quantity (21.2s)
  ✓   41 [mobile-360] › e2e/post-wizard-specs.spec.ts:1232:3 › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change (13.9s)
  ✓   42 [mobile-360] › e2e/post-wizard-where.spec.ts:157:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place (20.2s)
  ✓   43 [mobile-360] › e2e/post-wizard-specs.spec.ts:1282:3 › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills (21.2s)
  ✓   45 [mobile-360] › e2e/post-wizard-specs.spec.ts:1350:3 › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met (17.3s)
  ✓   44 [mobile-360] › e2e/post-wizard-where.spec.ts:208:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-84 a new post opens on the seller's own last post, never another seller's (37.0s)
  ✓   46 [mobile-360] › e2e/post-wizard-specs.spec.ts:1393:3 › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name (17.7s)
  ✓   47 [mobile-360] › e2e/post-wizard-where.spec.ts:319:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-88 a step-3 answer's fact and narrowing reach the unit asked on the price page (20.6s)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37887614746-4-2971-2-xslfw6@ethio-e2e.invalid)
  ✓   68 [desktop-1280] › e2e/admin-attributes-safety.spec.ts:150:3 › Bundle 7 attribute safety › AT-73 Remove from a category names the listings that hold an answer, and removes (31.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37887614746-4-2971-3-y6xwr0@ethio-e2e.invalid)
  ✓   71 [desktop-1280] › e2e/admin-attributes-library.spec.ts:1028:3 › C3 attributes console › AT-17 an inherited row names its origin and clears the child's card flag (10.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37887614746-4-2971-2-xslfw6@ethio-e2e.invalid)
  ✓   72 [desktop-1280] › e2e/admin-attributes-safety.spec.ts:197:3 › Bundle 7 attribute safety › AT-73b a failed holders read shows its error, keeps the confirm disabled and removes nothing (8.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37887614746-4-2971-3-y6xwr0@ethio-e2e.invalid)
  ✓   73 [desktop-1280] › e2e/admin-attributes-library.spec.ts:1065:3 › C3 attributes console › AT-18 the scoped export carries the subtree only, with origin (10.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37887614746-4-2971-2-xslfw6@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (16) ---
  ✘   27 [desktop-1280] › e2e/feed-index.spec.ts:259:3 › FEED INDEX › FE-6 a listing written active is indexed by itself (17.1s)
  ✘   40 [desktop-1280] › e2e/feed-index.spec.ts:259:3 › FEED INDEX › FE-6 a listing written active is indexed by itself (retry #1) (19.7s)
  ✘   46 [desktop-1280] › e2e/feed-index.spec.ts:268:3 › FEED INDEX › FE-7 leaving active removes the rows and returning restores them (20.0s)
  ✘   50 [desktop-1280] › e2e/feed-index.spec.ts:268:3 › FEED INDEX › FE-7 leaving active removes the rows and returning restores them (retry #1) (15.3s)
  ✘   52 [desktop-1280] › e2e/feed-index.spec.ts:282:3 › FEED INDEX › FE-8 the tier sets the rank (18.4s)
  ✘   53 [desktop-1280] › e2e/feed-index.spec.ts:282:3 › FEED INDEX › FE-8 the tier sets the rank (retry #1) (21.7s)
  ✘   56 [desktop-1280] › e2e/feed-index.spec.ts:297:3 › FEED INDEX › FE-9 an extra place removed or added changes the rows (28.6s)
  ✘   58 [desktop-1280] › e2e/feed-index.spec.ts:297:3 › FEED INDEX › FE-9 an extra place removed or added changes the rows (retry #1) (25.0s)
  ✘   62 [desktop-1280] › e2e/feed-index.spec.ts:316:3 › FEED INDEX › FE-10 a category surfaced under a new parent is re-indexed by the sweep (24.7s)
  ✘   67 [desktop-1280] › e2e/feed-index.spec.ts:316:3 › FEED INDEX › FE-10 a category surfaced under a new parent is re-indexed by the sweep (retry #1) (23.0s)
  ✘   70 [desktop-1280] › e2e/feed-index.spec.ts:355:3 › FEED INDEX › FE-11 a city moved to another region is re-indexed by the sweep (23.4s)
  ✘   72 [desktop-1280] › e2e/feed-index.spec.ts:355:3 › FEED INDEX › FE-11 a city moved to another region is re-indexed by the sweep (retry #1) (24.7s)
  ✘   82 [desktop-1280] › e2e/feed-index.spec.ts:390:3 › FEED INDEX › FE-12 the reviewer's door to active indexes the listing (10.5s)
  ✘   83 [desktop-1280] › e2e/feed-index.spec.ts:390:3 › FEED INDEX › FE-12 the reviewer's door to active indexes the listing (retry #1) (13.2s)
  ✘   84 [desktop-1280] › e2e/feed-index.spec.ts:414:3 › FEED INDEX › FE-13 the daily check writes its counts (327ms)
  ✘   85 [desktop-1280] › e2e/feed-index.spec.ts:414:3 › FEED INDEX › FE-13 the daily check writes its counts (retry #1) (350ms)
--- final 10 lines ---
✓  113 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:281:3 › POSTING WIZARD — bundle 2 place and contact › PW-134 names typed during the identity read survive it and are saved (16.2s)
  ✓  114 [desktop-1280] › e2e/photo-pipeline.spec.ts:223:3 › PHOTO PIPELINE › PP-6 another seller's listing is a 403 (17.5s)
  ✓  115 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:350:3 › POSTING WIZARD — bundle 2 place and contact › PW-130 a refused seller name offers three free names, claimed on save (17.9s)
  ✓  117 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:397:3 › POSTING WIZARD — bundle 2 place and contact › PW-147 an empty seller-name box offers three names from the typed names; a saved name offers none until cleared (bundle 4 step 21, INC-422) (13.2s)
  ✓  116 [desktop-1280] › e2e/photo-pipeline.spec.ts:247:3 › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos (30.5s)
  ✓  118 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:466:3 › POSTING WIZARD — bundle 2 place and contact › PW-150 a saved seller name offers no suggestions until its box is cleared (11.9s)
  ✓  120 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:501:3 › POSTING WIZARD — bundle 2 place and contact › PW-151 the account card shows the name and each saved channel with whether buyers see it (8.9s)
  ✓  119 [desktop-1280] › e2e/photo-pipeline.spec.ts:267:3 › PHOTO PIPELINE › PP-8 DELETE removes the row and the objects; POST makes a photo the cover (16.7s)
  ✓  122 [desktop-1280] › e2e/photo-pipeline.spec.ts:303:3 › PHOTO PIPELINE › PP-9 the upload dial refuses once the seller's hourly ceiling is reached (10.2s)
```

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
--- final 10 lines ---
✓   47 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1458:3 › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down, and relative bounds resolve as the door does (INC-288) (15.7s)
  ✓   48 [desktop-1280] › e2e/post-wizard-where.spec.ts:319:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-88 a step-3 answer's fact and narrowing reach the unit asked on the price page (19.3s)
  ✓   49 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1628:3 › POSTING WIZARD › PW-58 under Amharic a year reads with its Ethiopian years, the same on the picker and the review (D45) (19.9s)
  ✓   50 [desktop-1280] › e2e/post-wizard-where.spec.ts:372:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is held by the price page's unit (16.0s)
  ✓   51 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1680:3 › POSTING WIZARD › PW-159 a list fact ticks its tick list once, and the seller's untick stays (14.8s)
  ✓   52 [desktop-1280] › e2e/post-wizard-where.spec.ts:406:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-89 thousand / million: the full amount is stored and shown (17.8s)
  ✓   53 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1761:3 › POSTING WIZARD › PW-153 a settled range hides its number and the review and buyer sheet show the range (17.0s)
  ✓   54 [desktop-1280] › e2e/post-wizard-where.spec.ts:448:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-90 two boxes, a red border per unfilled level, the plan in one line (18.1s)
  ✓   55 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1856:3 › POSTING WIZARD › PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray (12.2s)
```

```text
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```
