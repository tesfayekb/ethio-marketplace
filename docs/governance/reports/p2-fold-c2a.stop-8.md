STOP — p2-fold-c2a ruling 6 §4: CF-LIST-1 refuses `LIST_ROW_CURRENT` by place, not by a missing attribute
DONE: ruling 7 saved by scripted copy (d284a4c9d; sha256 `b36e155b30ca665f7c679146e8241fdde61d88b989ff1cd459c45bc4ff6d6726`, equal to the ruling's); ruling 6 §3 (ec5dd5420, f66588cf7)
LEFT: ruling 6 §4 (this stop), §5 (one e2e level-name helper, the four copies go), §6 (checks, budgets with ruling 7 §2's ceiling move, self-review, the final report)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `e2e0f73652de2cc2cb5edad7f569166cce75569e` (short `e2e0f73`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-08T11:55:31Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42476014167

FILES: `git diff --name-only 5bd54705d` at the end of this file (110 files)

## The question

Ruling 6 §4 and ruling 7 §3: W1's current row carries `aria-current="true"` and the permanent
allowance goes — "STOP with the guard's rule quoted if CF-LIST-1 refuses by place". It does. The
rule, `scripts/conformance/choice-lists.test.ts` lines 145–157, quoted:

```ts
    // INC-1027 (turn F2): a current row comes from the checked state (a radio item's
    // data-[state=checked], read by LIST_ROW), so it is heard as well as seen; the look by
    // class lives only in menu-row.ts and the owners above.
    const current = /\bLIST_ROW_CURRENT\b/.exec(text);
    if (current !== null) {
      const line = text.slice(0, current.index).split("\n").length;
      keys.push(`${name}#current`);
      findings.push({
        file: name,
        line,
        what: "current: LIST_ROW_CURRENT by class — use a radio item's checked state (INC-1027)",
      });
    }
```

It reads the file's text: any `LIST_ROW_CURRENT` in a file outside `OWNERS` (dropdown-menu-impl,
searchable-picker, popover-impl) is a finding, whatever the element carries. An
`aria-current="true"` on the row would not clear it, so removing the allowlist line
(`src/features/my-listings/promote-sheet.tsx#current | permanent: …`) turns CF-LIST-1 red. Neither
change is made: `src/features/my-listings/promote-sheet.tsx` (line 158,
`level.current && LIST_ROW_CURRENT`) and the allowlist line stand as committed before this stop.

What the rulings do not answer: by which of these may the current row keep the shell's look with
no permanent line?
1. CF-LIST-1 learns the attribute: `LIST_ROW_CURRENT` outside the owners passes only on an
   element that carries `aria-current` read from the same state (a guard change: its planted
   bypass in the same pull request, K3; `scripts/conformance/choice-lists.test.ts` enters scope).
2. The allowance stays with an `until` (a dated line), and the attribute lands beside it.
3. The current row draws its look by another constant that `menu-row.ts` owns for a non-list
   row, with `aria-current` (a new key in the shared mechanism; `menu-row.ts` enters scope).
4. The row drops the look and keeps its words (`myListings.promote.current`), and the line goes.

## Ruling 6 §3 as built (the part this stop follows)

- `src/features/levels/level-fields.ts` (new, beside the store, no store and no read): the look
  (`LevelLook`, `PLAIN_LOOK`), `parseCardLevel`, `parseDocumentLevel` (the ad document's `level`
  with `name_en` / `name_am`, NULL or absent read as NULL) and THE name chooser `levelNameOf`
  (`catalogText`; null when there is no name). The store's rows and the ad page both name a level
  through it; the store's `levelName` is gone (its callers — the card, the Set level dialog,
  `levelLabel` — call `levelNameOf`; a nameless row draws no flag on a card and "Level not known"
  in the dialog, the existing `admin.listings.level.unknown`).
- `src/features/ad-page/public-listing.ts`: `adPageLevelName(doc, language)` — the document's own
  names, only when its `level` names the ad's key; `src/routes/l.$slug.tsx` draws the flag's word
  from it and no longer imports the store (no `useLevelRows`, so a direct landing makes no read).
- Unit: `public-listing.test.ts` AV-12 (English, Amharic, Amharic missing → English, both NULL →
  null, an answer without names → null, another key → null); LVS-2 and LVS-4 import from
  `level-fields.ts`. 409 of 409 in the touched folders; typecheck clean; lint 0 errors, 46
  warnings (the baseline); `bunx vitest run scripts --maxWorkers=2` 492 of 493 (NH-6 only, this
  computer's time zone).
- Browser, each file whole, both projects, 0 retries (`bun run e2e:local`, ethio-staging):
  `supabase-door.spec.ts` 12 passed (SBE-1 green on both projects; red on CI's lanes 8 and 16 at
  e2e0f7365); `sage-ad-page.spec.ts` 10 passed, 8 skipped; `sage-tiers.spec.ts` 20 passed, 20
  skipped; `ad-page.spec.ts` 73 passed, 5 skipped. The first `supabase-door` start stopped at the
  i18n map guard (the dialog's new call of an existing key); the maps were committed (f66588cf7)
  and the file ran again whole.
- CI at e2e0f7365 (run 42476014167), read: SBE-1 on both projects (the 2 gating failures), the
  migration-parity preflight (staging behind before part 7's apply), the bundle budget
  (`/my-listings_/$listingId`, ruling 7 §2's move, owed in §6). Not yet run on this head.
- Departure named for the supervisor: `level-fields.ts` is a new file in the levels feature's
  folder (ruling 1 Q9 placed the store there); it is how the ad page reaches the one chooser
  without the store.

## Files

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
docs/governance/briefs/p2-fold-c2a-ruling-7.md
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
src/features/levels/level-fields.ts
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
