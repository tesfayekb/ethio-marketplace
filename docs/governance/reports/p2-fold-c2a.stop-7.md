MIGRATION — p2-fold-c2a M-3c-a part 7: the ad page's document answers its level's names (ruling 6 §2)
DONE: ruling 6 saved by scripted copy (b7286de47; the text taken by script from the chat, since no attachment was on disk, its sha256 `aa0a9a75f7ba8cc4851240db9a8ac38e2d4e535593d393b3485d414e0d27ae3f` equal to the ruling's); M-3c-a part 7 committed (e7f3e3782); `bash scripts/check-migrations.sh` "Migration guard OK"; `bun run db:proof --fresh` PASS (431/431); `bunx vitest run scripts --maxWorkers=2` 492 of 493 (NH-6 only, this computer's time zone)
LEFT: the staging apply (the supervisor's or the operator's) and its read-back; then, after "continue", ruling 6 §3 (the ad page reads its document), §4 (W1's `aria-current`, the permanent line removed), §5 (one level-name helper for the specs), §6 (checks, budgets, self-review, the final report)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `12ab0a712704b23c5c3b5b65ed96ac1bdab072ab` (short `12ab0a7`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-08T10:33:35Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42470396343

FILES: `git diff --name-only 5bd54705d` at the end of this file

## The file

| File | Bytes | sha256 | Mark |
|---|---|---|---|
| `supabase/migrations/20261108112436_4d6e08ad-e0c6-4c0e-b675-08a72819b842.sql` | 15999 | `f7b916f63ad31d0b6cb687abbc9bbe56314082cec94a5a2a1eb278e15f9230bf` | `20261108130000` |

- **Redeclares** `public.public_listing_json(public.listings, uuid)` by computed insertion guarded by
  md5 (law 13, CR-normalised). The live body part 6 left is md5 `658946271564eb7906d91729e995407b`.
  One unique fragment is replaced: the `level` expression gains `'name_en', k.name_en, 'name_am',
  k.name_am` from one `LEFT JOIN public.listing_packages k ON k.key = l.tier AND k.kind = 'level'`
  inside the same subselect. The new md5 is `26f176eb3ebc0c711ee4f868656a3f42`. The header is kept
  (STABLE, SECURITY DEFINER, `search_path=public`) and checked before the apply; the service-only
  grants are restated; the new md5 is asserted after the apply.
- **The md5s, computed offline from the files.** 20261029090431's body reproduces `0cde7e74…`; part
  6's fragment applied to it reproduces `65894627…`; part 7's fragment applied to that gives
  `26f176eb…`.
- **Pre-check:** mark `20261108090500` present, and the live md5 `658946271564eb7906d91729e995407b`.
- **The mark** is set by G39's rule: the commit at 11:27 UTC, rounded up to 12:00, plus one hour,
  gives `20261108130000`. The file's stamp `20261108112436` is before it.
- **Proofs** (one `DO` block, scratch rows under the sentinel; the scratch market XZ and currency XTS,
  the INC-949 way; the only real rows read are the level rows' sorts, read only):
  - (a) the header and the grants are unchanged (service-only);
  - (b) the body with the fragment put back hashes to `658946271564eb7906d91729e995407b`;
  - (c) an ad at an enabled scratch level answers `level` = {key, placement `boost`, badge true — its
    overrides — and the row's `name_en` and `name_am`}; an ad at a switched-off scratch level answers
    its names (its `name_am` NULL, as stored) with NULL axes; `tier` is unchanged and no `levels` key;
  - (d) the first ad, with its index rows removed, answers its names with NULL axes, `tier`
    unchanged, no `levels` key.
- **Not proven by a scratch row:** NULL names for a key with no level row. `listings.tier` references
  `listing_packages(key)` (`listings_tier_fkey`, 20261104124957:48), so every ad's key has a row.
  The `kind = 'level'` condition answers NULL names only for a key whose row is another kind.
- **The generated types:** the function's return type is unchanged (`jsonb`), so no change is
  expected.

## Guard lines (`bash scripts/check-migrations.sh`)

```
Born-closed guard OK (floor 20261007143529).
Definer guard OK.
Self-marking guard OK (floor 20260817054246).
Public-surface guard OK (floor 20261003215043).
Real-row proof guard OK (floor 20261007000000).
Migration guard OK.
```

`bun run db:proof --fresh`, its last line:

```
db:proof PASS — applied 431/431, CLI 2.120.0, cold, 50 s
```

## The stop-6 commit's run (12ab0a7), read before this push

- **Infrastructure (rule 40 (b)), not re-run (this push starts a new run):** "Build, typecheck,
  lint", "Import gate guard", "Gitleaks secrets scan" and "i18n used-on map is fresh". Each fetch
  of a pinned tool from GitHub's release host (actionlint, Bun, gitleaks) answered 504.
- **SBE-1** (`e2e/supabase-door.spec.ts:112`, lanes 8 and 16, both projects): stop 6's subject,
  fixed by ruling 6 §3 after "continue". E2E otherwise: 2798 passed, 2 failed, 0 flaky.
- **Mine, for §6:** "First-paint bundle budget" — `/my-listings_/$listingId: 329.3 KiB, over its
  ceiling of 329 KiB`. The seller's own ad page now carries the levels store (its preview's look,
  `useLevelLook`). Fixed after "continue", with the budgets step, by DEC-296's form or by moving the
  addition off the first download, with its cause named. It is not touched before then.
- The newest run after this push will also show its preflight "STAGING BEHIND" until ethio-staging
  holds the mark (expected).

## Pairing line

apply 4d6e08ad → expect mark 20261108130000

## FILES (`git diff --name-only 5bd54705d`, with this report)

```
docs/_changelog.md
docs/features/admin-listings.md
docs/features/feed-engine.md
docs/features/levels-store.md
docs/generated/i18n-usage.json
docs/governance/briefs/p2-fold-c2a-ruling-1.md
docs/governance/briefs/p2-fold-c2a-ruling-2.md
docs/governance/briefs/p2-fold-c2a-ruling-3.md
docs/governance/briefs/p2-fold-c2a-ruling-4.md
docs/governance/briefs/p2-fold-c2a-ruling-5.md
docs/governance/briefs/p2-fold-c2a-ruling-6.md
docs/governance/mechanisms.md
docs/governance/reports/p2-fold-c2a.stop-1.md
docs/governance/reports/p2-fold-c2a.stop-2.md
docs/governance/reports/p2-fold-c2a.stop-3.md
docs/governance/reports/p2-fold-c2a.stop-4.md
docs/governance/reports/p2-fold-c2a.stop-5.md
docs/governance/reports/p2-fold-c2a.stop-6.md
docs/governance/reports/p2-fold-c2a.stop-7.md
docs/tracking/intentional-deletions.txt
e2e/admin-listings.spec.ts
e2e/admin-screening.spec.ts
e2e/dark-cards.spec.ts
e2e/feed-route.spec.ts
e2e/helpers/ad-page.ts
e2e/helpers/alias-check.ts
e2e/my-listings-promote.spec.ts
e2e/post-wizard-category.spec.ts
e2e/sage-tiers.spec.ts
public/i18n-usage.json
scripts/conformance/card-tiers.test.ts
scripts/conformance/choice-lists-allowlist.txt
scripts/conformance/listing-levels-allowlist.txt
scripts/conformance/listing-levels.ts
scripts/feed-bench.test.ts
scripts/feed-bench.ts
src/components/marketplace/card-tier.test.ts
src/components/marketplace/card-tier.ts
src/components/marketplace/listing-card.test.tsx
src/components/marketplace/listing-card.tsx
src/components/marketplace/negotiable-badge.test.tsx
src/components/marketplace/tier-flag.test.tsx
src/components/marketplace/tier-flag.tsx
src/features/ad-page/public-listing.test.ts
src/features/ad-page/public-listing.ts
src/features/ad-page/save.ts
src/features/ad-page/similar-ads.test.tsx
src/features/ad-page/similar.test.ts
src/features/ad-page/similar.ts
src/features/admin-listings/change-listing-tier.test.ts
src/features/admin-listings/history.ts
src/features/admin-listings/listing-page.tsx
src/features/admin-listings/listings-page.tsx
src/features/admin-listings/tier-dialog.test.tsx
src/features/admin-listings/tier-dialog.tsx
src/features/admin-listings/tier-reasons.test.ts
src/features/admin-listings/tier-reasons.ts
src/features/admin-listings/use-admin-listings.ts
src/features/admin-screening/screening-page.tsx
src/features/admin-screening/use-screening.test.ts
src/features/admin-screening/use-screening.ts
src/features/feed/feed-page.test.ts
src/features/feed/feed-page.ts
src/features/feed/held-first-page.test.ts
src/features/feed/ranking.ts
src/features/feed/use-feed.ts
src/features/levels/levels-store.test.ts
src/features/levels/levels-store.ts
src/features/my-listings/my-listing-page.tsx
src/features/my-listings/promote-sheet.test.tsx
src/features/my-listings/promote-sheet.tsx
src/features/posting/posting-service.test.ts
src/features/posting/posting-service.ts
src/features/posting/preview/listing-detail-map-failed.test.tsx
src/features/posting/preview/listing-detail-map.test.tsx
src/features/posting/preview/listing-detail-tier.test.tsx
src/features/posting/preview/listing-detail.test.tsx
src/features/posting/preview/listing-detail.tsx
src/features/posting/preview/preview-sheet.tsx
src/features/posting/refusal-text.ts
src/features/posting/step-review.tsx
src/features/posting/step-where.tsx
src/features/posting/use-draft.ts
src/features/posting/use-edit-draft.ts
src/features/seller/seller-page.test.tsx
src/features/seller/use-seller-feed.ts
src/i18n/locales/am-admin.ts
src/i18n/locales/am-base.ts
src/i18n/locales/am-member.ts
src/i18n/locales/en-admin.ts
src/i18n/locales/en-base.ts
src/i18n/locales/en-guide.ts
src/i18n/locales/en-member.ts
src/integrations/supabase/types.ts
src/routes/api/feed.test.ts
src/routes/api/feed.ts
src/routes/api/seller.test.ts
src/routes/api/seller.ts
src/routes/dev.style.tsx
src/routes/l.$slug.tsx
src/test/e2e-alias-check.test.ts
supabase/migrations/20261108070500_f5397010-c354-4ed9-81fd-0799efc8c7a7.sql
supabase/migrations/20261108070501_6da335da-6663-4037-94a5-428169504eef.sql
supabase/migrations/20261108070502_6ea5ac5b-1a2f-4a63-8c3a-a69b6443e755.sql
supabase/migrations/20261108070503_ff2ee3b9-0e37-46b4-9214-e35bec6b61a2.sql
supabase/migrations/20261108070504_5e07ef82-a019-4294-95c9-bc6f44d4335b.sql
supabase/migrations/20261108070505_2d85fa86-6df7-452a-97d2-cb32e7f7a977.sql
supabase/migrations/20261108112436_4d6e08ad-e0c6-4c0e-b675-08a72819b842.sql
```
