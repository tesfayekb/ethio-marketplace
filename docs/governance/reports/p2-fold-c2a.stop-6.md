QUESTION — p2-fold-c2a, the GO's steps 3–7 (ruling 5 §4): the ad page's level name on a direct landing needs the Supabase client, which DEC-261 keeps off public pages
DONE: ruling 5 §2 (INC-1085: the alias helper, the three tests, the unit test, the rule read — 2d10fbd6f); the GO's steps 3–7 as built (the store, card-tier on {placement, badge}, the types, feed-page's any key, the readers and routes passing `levels`, the ad page, the previews, the admin console, the seeders, the strings by script, W1, the CF-LEVEL-1 empties, the owed unit tests — fd4709864); the docs (a09f988f1); the local browser check (below)
LEFT: the answer to this question and its fix; then `bun run checks` whole, the budgets, the self-review (rule 80), the report, push, the pull request's checks, the comment
CI: (the newest completed run, read with `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`; it is the stop-5 commit, the branch's last push — fd4709864 and a09f988f1 have no run yet)
# CI Status (auto-generated — do not edit by hand)

- Commit: `fdd1eb4b2d443013d1308510ee50fa95b925882a` (short `fdd1eb4`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-08T08:45:10Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42462686592
FILES: see `git diff --name-only 5bd54705d` at the end of this file (105 paths with this report)

## The question

`e2e/supabase-door.spec.ts` SBE-1 (DEC-261, register row 50), both projects, fails at line 112 on
the ad page: `/l/<slug>: no script carries the client` — received the client's chunk
(`/assets/dist-*.js`). The home, the category page and the terms pass.

Cause, as read: the buyer's ad page asks the levels store for its level's name
(`src/routes/l.$slug.tsx:227`, `useLevelRows({ looks: false })`, then `exactLevel` and `levelName`
at :229–233, the flag's word and accessible name). On a page reached from a card answer the store
is already seeded and nothing is read. On a direct landing it is empty, so it makes its one table
read (`src/features/levels/levels-store.ts:176–178`, `getSupabase()`), and that downloads the
client. Ruling c2a-1 §3 put the names there ("the ad page renders its `level` from its own answer
(its row's key, placement, badge — §4); the store serves names and the screens without a card
answer"). No ruling says how the store gets names on a public page without the client. The only
anonymous doors that answer the level rows' names are `feed_page` and `seller_feed_page` (their
`levels` dictionary; `scripts/doors/manifest.txt`). `public_listing_json`'s `level` carries no
names. A second, smaller effect follows: the server render of a direct landing has no names, so the
flag appears only after the read.

The options I see (none built; the tree is as committed):

1. **The ad's own answer carries its level's names.** `public_listing_json`'s `level` gains
   `name_en` and `name_am` (p2-fold-ruling-1 §8 first said "the same fields, that ad's row"). The ad
   page draws the word from its own answer, so there is no store read, no client and no late flag,
   and the server render draws it. Cost: a migration (computed insertion, like M-3c-a's
   `public_listing_json` part), so a MIGRATION stop and the staging apply. It could join c2b's
   M-3c-b, but c2a must pass SBE-1 before then.
2. **The store's read on a public page goes through the anonymous door.** On a direct landing, the
   store reads the dictionary from `rpc("feed_page", { p_size: 1 })` (src/lib/supabase-door.ts's
   anonymous `rpc`, no client), as `scripts/feed-bench.ts` does. No migration. Cost: one extra feed
   call per direct landing, the flag still late, and a third source in the store's design.
3. **The ad page draws the word only from a seeded store.** A direct landing shows the level's frame
   and colours but no flag until the visitor has seen a card answer. No migration, no read. Cost: a
   visible loss on the most-shared page (the flag and its accessible name).

My recommendation is 1. It matches the ruling's first form, keeps DEC-261 whole and removes the
late flag. Until it lands, 3 can keep SBE-1 green in c2a, if you prefer c2a without a migration.

## The local browser check (ethio-staging; each file whole, alone, both projects, retries 0; fd4709864's tree)

`PLAYWRIGHT_BROWSERS_PATH=… E2E_RETRIES=0 bun run e2e:local -- e2e/<file>`, one run per file; the
count lines as Playwright printed them:

- sage-tiers 20 passed, 20 skipped (by project) · my-listings-promote 8 passed · dark-cards 4 passed
  · feed-route 22 passed · post-wizard-category 46 passed, 2 skipped · feed-screens 35 passed,
  1 skipped · sage-ad-page 10 passed, 8 skipped · account-saved 4 passed · ad-page-doors 30 passed ·
  ad-page-layout 2 passed · ad-page 73 passed, 5 skipped · auth-caller-gates 8 passed · dialogs 14
  passed · name-check-queue 7 passed, 1 skipped · one-line-slots 5 passed, 5 skipped · page-head 4
  passed · press 21 passed, 1 skipped · sage-bands 38 passed, 38 skipped · sage-cards 12 passed, 16
  skipped · seller-name-hidden 2 passed · user-guides 18 passed · choice-lists 38 passed, 58 skipped
  · house-style 12 passed · phone-frame 9 passed, 9 skipped · post-wizard-where 32 passed.
- admin-listings 70 passed, 6 failed: AL-20, AL-23 and AL-30 on both projects; ATR-1…7 all passed.
  admin-screening 50 passed, 4 failed: SC-25 and SC-26 on both projects; SC-27 passed. All ten are
  INC-1066 (the `Control+A` presses that move the caret on macOS; the new title is typed after the
  old one, and AL-30's day count becomes valid and reaches the step-up). These are the same tests
  and the same counts as the p1-packages report's local run. CI's Linux lanes are their proof.
- **supabase-door 10 passed, 2 failed: SBE-1 on both projects — this question.**

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
docs/governance/mechanisms.md
docs/governance/reports/p2-fold-c2a.stop-1.md
docs/governance/reports/p2-fold-c2a.stop-2.md
docs/governance/reports/p2-fold-c2a.stop-3.md
docs/governance/reports/p2-fold-c2a.stop-4.md
docs/governance/reports/p2-fold-c2a.stop-5.md
docs/governance/reports/p2-fold-c2a.stop-6.md
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
```
