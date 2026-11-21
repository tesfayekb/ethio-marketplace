# L22c — posting and the ad page say WHEN, the two Guide lines, the preview look (PLAN)

Branch `lovable/reset-words-c` · base commit `4bf2293e9`. The sandbox HEAD is `4bf2293e9` and the tree is clean against it.

## Part 2 question first (read only)
Yes, option B needs a change under `scripts/`. `scripts/conformance/admin-guides.ts:172-174` builds the keys a block needs from the fixed endings: `${prefix}.guide.what`, `.guide.col.<key>` and `.guide.how`. Its `unclaimed` rule (`:39`) fails any key in en-guide.ts that no block needs, so override keys would be flagged and the old what/how would still be needed. **I propose option A.**

## (a) Families, from the tree at the base
| Family | Where the instant is lost | Change | Callers |
|---|---|---|---|
| Posting draft | `refusal-text.ts:171` `draftRefusalKey` returns `.key` | `DRAFT_REFUSALS.when` → `post.refusal.rateLimitedWhen`; new `draftRefusalText(reason, t, language)` beside the key reader | wizard.tsx:1701, 1764; step-who.tsx:755, 1012; step-where.tsx:1720; step-review.tsx:838; step-pricing.tsx:439; step-details.tsx:454 |
| Posting photo | `refusal-text.ts:185` `photoRefusalKey` returns `.key`; step-photos stores `refusalKey` (278, 331, 345, 365, 391, 416, 484, 589) | `PHOTO_REFUSALS.when` → `post.photo.refusal.rateLimitedWhen`; step-photos stores the refused reason next to its key and draws `photoRefusalText` | step-photos.tsx only. listing-photos.tsx:216 and photo-reviews.tsx:161 read review codes with no instant, so they stay unchanged |
| Pin answer | `posting-service.ts:1147-1152` `pinAnswer` returns `"rateLimited"` | return value kept; a second export `pinRateUntil(message)` returns the instant; the answer gains an optional `until` | step-where.tsx:2137, 2231 (line state `rateLimited` keeps its key and gains the instant) |
| Specifications | `posting-service.ts:846-853` returns `rateLimited: boolean`; step-specifications.tsx:173/244/288 | add `rateUntil?: string`; draw `post.specs.rateLimitedWhen` when there is an instant | step-specifications.tsx:1194, 1207, 1756. The options route answers `{reason:"rateLimited"}` with no instant, so it stays plain |
| Ad page save | `ad-page-refusals.ts:59` collapses to `"rateLimited"` | `saveRefusal` kept byte for byte; new `rateUntilOf(failure)` beside it; `save.ts:20` answer gains `until?` | l.$slug.tsx:146, 166, 314 → listing-detail.tsx:279, 794 |
| Ad page report | `:67-69` | `reportRefusal` kept; `report.ts:33` answer gains `until?` | report-ad-dialog.tsx:41, 73-74 |
| Ad page contact | `:83-85` | `contactRefusal` kept; `contact.ts:37, 40` answer gains `until?` | listing-detail.tsx:1522-1523 |

Each family declares its own `when` map next to its plain words. A refusal with no instant, or an instant in the past, keeps today's sentence.

## (b) Keys
Added, each beside its plain key:
- `post.refusal.rateLimitedWhen` (base layer): "You have saved many times in a short while. Try again {when}." Amharic is held by the supervisor.
- `post.photo.refusal.rateLimitedWhen` (base layer): the plain sentence with "Try again {when}." Amharic is held by the supervisor.
- `post.specs.rateLimitedWhen` (member layer): the plain sentence with "Try again {when}." Needs Amharic.
- `adPage.save.rateLimitedWhen` (base layer): "You have saved many ads today. Try again {when}."
- `adPage.report.rateLimitedWhen` (base layer): "You have sent many reports today. Try again {when}."
- `adPage.contact.rateLimitedWhen` (base layer): "You have looked up many contacts today. Try again {when}."

No key is retired; every plain key stays as the fallback. The key census for each changed file is pasted at the start of the build, and every other key those files draw is kept.

Part 2 (option A): the level block's 20 guide keys move from `admin.monetisation.level.guide.*` to `admin.monetisation.levels.guide.*`, with the prefix changed at `products-section.tsx:328`.
- 18 keys keep their English and their Amharic byte for byte, copied by script.
- `what` and `how` take the "specific perks" wording and need new Amharic.
- The 20 old keys are retired; nothing else in src, e2e or scripts reads them.

## (c) First download
`bun run build` was not run in plan mode, because it writes `dist/`. It is the first step of the build.
- If a changed module in `index` or `shared-shell` has different imports, the build stops there.
- No changed file will import `refusal-tail.ts` or an admin key; the only import added is `refusalText` from `src/lib/refusal.ts`.
- Known risk: `refusal.ts` sits in its own `refusal` chunk. Public pages (`l.$slug`, listing-detail) may not load it today. If they don't, `rateUntilOf` reads the instant through `splitRefusal`, which already ships in `index`, and the page fills `{when}` with `relativeTime`. I will report which of the two holds.

## (d) Tests
One test per family, RTW-15 to RTW-21. Each checks that a future instant draws the "when" words and that no instant keeps the plain words. The ids are checked free across src, e2e and scripts at build time. The new `until?` fields are proven with `expectTypeOf`. Existing tests that compare exact answer shapes stay unchanged, because `until` is added only when an instant exists.

## (e) e2e
- `ad-page-doors.spec.ts:773/779/880/886` read `saveRefusal`/`reportRefusal` and expect `"rateLimited"`. Those readers keep their return value, so the specs don't break.
- `post-wizard-specs.spec.ts:399/401` check the testid, `data-reason="rateLimited"` and the exact `en["post.specs.rateLimited"]` text. Their route answer carries no instant, so the plain text stays and the specs don't break.
- `post-wizard-bundle2:1140`, `photo-pipeline:445`, `post-wizard-place:1540` and the `ad-page-doors:562/771/777/878/884` code checks read codes or reasons only, so they don't break.
- The `per-category` hits are comments and test titles in `admin-monetisation.spec.ts:97/797/819` and the attribute specs; they don't break.

No spec edits.

## (f) Guards
- String scan.
- strings-layers: ad page and posting keys go to the base layer, the specifications key to member, the guide keys to the guide layer.
- Both usage maps regenerated.
- test-ids, non-null, forms and refusal-readers.
- The guide check is `scripts/conformance/admin-guides.test.ts`; there is no `scripts/admin-guides.test.ts`. It judges option A.

## (g) Count and split
About 30 source files: 17 family files, about 6 locale files, 1 guide spec and about 6 tests. Proposed split:
- **L22c (this turn): the ad page and Part 2**, about 14 files: ad-page-refusals, save, report, contact, l.$slug, report-ad-dialog, listing-detail, products-section, en/am-base, en/am-guide, and tests.
- **L22d: posting**, about 16 files: refusal-text, wizard, the steps, posting-service and step-specifications.

## (h) Part 3 result (INC-1193)
At base `4bf2293e9`, I opened `/` and `/l/canon-dslr-camera-rescvrjk6v` in the sandbox preview with headless Chromium. There was no `Cannot access enBase before initialization`, and no page error on either page. The ad page logged four `401` resource loads (signed-out reads) and nothing else. Earlier turns did see that error on `/dev/primitives`, which I haven't checked here. I don't have the error from Lovable's hosted preview.

## (i) Differently
- I would keep every code-returning reader and add the instant beside it, rather than change what the readers return, because e2e specs read those values.
- `pinAnswer` is in `posting-service.ts`. Its key reader is unchanged; only a sibling export is added. No query changes.
- The photo review codes on the staff screens keep the plain words; they carry no instant.

## Not changed
Doors, queries, permissions, testids, `scripts/`, `src/integrations/`, `src/features/auth/`, `src/server/` and `src/routes/api/` are unchanged. `use-draft.ts`, the route words with no instant, and `auth.errorRateLimited` stay out of scope.
