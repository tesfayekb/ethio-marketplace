STOP — sage-s4-tiers part 3: card pages grow more than 1 KiB (docs/governance/plans/redesign-part-2.md line 71, DEC-296)
DONE: parts 1, 2, 3 (tokens and grammar; the satin ribbon in CSS with its rolled caps; the tier mechanism card-tier.ts + tier-flag.tsx drawn by ListingCard), each committed with typecheck, lint, the touched unit tests and the scripts laws run
LEFT: parts 4 (the invite card), 5 (/dev/style's fixture grid), 6 (CF-TIER-1…3), 7 (e2e sage-tiers), 8 (ceilings and docs), then the checks, the browser check, the self-review and the report
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `043f8aa925ec2d417b8430da069b6d2eea285ebf` (short `043f8aa`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-01T11:00:43Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41298434038
FILES:
docs/generated/i18n-usage.json
docs/governance/briefs/sage-s4-tiers.md
docs/governance/briefs/sage-s4-tiers.ruling-1.md
public/i18n-usage.json
roadmap.md
src/components/marketplace/card-tier.test.ts
src/components/marketplace/card-tier.ts
src/components/marketplace/listing-card.test.tsx
src/components/marketplace/listing-card.tsx
src/components/marketplace/listing-picture.tsx
src/components/marketplace/negotiable-badge.tsx
src/components/marketplace/ribbon-geometry.test.ts
src/components/marketplace/ribbon-geometry.ts
src/components/marketplace/tier-flag.test.tsx
src/components/marketplace/tier-flag.tsx
src/lib/schemas/theme.ts
src/lib/themes.test.ts
src/lib/themes.ts
src/styles.css
src/styles.tokens.test.ts

## The rule

redesign-part-2.md line 71, which the brief names: "Growth is first-download KiB per page
(ESTIMATE). More than 1 KiB on any page, or growth with no named cause, is a STOP (DEC-296)."
Ruling 1 on the plan accepted my estimate in place of the plan's +0.8: card pages +0.5 to 0.7 KiB
of JS, the stylesheet +0.8 to 1.2 KiB. The measured page is past both.

## Measured (local builds on this machine, `bun run build && node scripts/check-bundle-size.mjs`)

The base was measured by putting the base's text (`git show 043f8aa9:<file>`) of every changed
source file in place, moving the new modules aside, building, and restoring every file from HEAD
(`git status --short` empty after). Local builds read about 0.1 KiB under CI (DEC-296).

| Page | Base | Tree (a3c251c74) | Change | Ceiling |
| --- | --- | --- | --- | --- |
| `/` | 226.2 | 228.8 | +2.6 | 227 |
| `/c/$slug` | 226.2 | 228.8 | +2.6 | 227 |
| `/l/$slug` | 256.4 | 259.0 | +2.6 | 257 |
| `/$name` | 224.6 | 227.1 | +2.5 | 225 |
| `/account_/saved` | 224.7 | 227.2 | +2.5 | 226 |
| `/dev/style` | 237.2 | 237.3 | +0.1 | 238 |
| `/admin/impersonation_/$sessionId` | 297.4 | 291.6 | −5.8 | 298 |
| `/admin/screening` | 367.8 | 366.4 | −1.4 | 369 |
| `/admin/listings_/$listingId` | 386.0 | 384.7 | −1.3 | 387 |
| `/admin/listings_/$listingId_/edit` | 408.6 | 407.5 | −1.1 | 410 |
| `/post`, `/my-listings_/$listingId_/edit` | 403.3 | 402.2 | −1.1 | 404 |
| `/post_/$listingId` | 403.2 | 402.2 | −1.0 | 404 |
| every other page | — | — | +0.1 to +0.3 | — |
| entry JS | 211.6 | 211.7 | +0.1 | 213 |
| stylesheet (Node's gzip, the checker's) | 21,930 B | 22,929 B | +999 B (0.98 KiB) | 40 |

Five card pages are over their ceilings now; those are raised in part 8 by DEC-296 whatever the
ruling. The question is the growth itself.

## Where the card pages' +2.6 KiB comes from (each measured on `/`)

1. Part 2, the ribbon's rolled caps, its palette variables and ribbon-geometry.ts: +0.5 KiB
   (226.2 → 226.7). Every page that draws a ribbon pays it.
2. Part 3, the tier look (card-tier.ts), the flag and the tier word (tier-flag.tsx): +1.0 KiB
   (226.7 → 227.7, measured with NegotiableBadge still inside listing-card.tsx).
3. Ruling 1's "the flag an SVG module only card pages download", +1.0 KiB more on card pages
   (227.7 → 228.8). Five screens that draw no card (the wizard's review and preview, my listings,
   the ad detail preview, impersonation) import only `NegotiableBadge` from listing-card.tsx, and
   so loaded the whole card chunk, which would now carry the flag. I moved the badge into its own
   module (negotiable-badge.tsx, re-exported from listing-card.tsx; the five importers are outside
   scope and unchanged). The flag now rides card pages only (its star path is in one chunk,
   `use-card-photos-*.js`, which none of the non-card pages loads), and those pages fell 1.0 to
   5.8 KiB. But the bundler now cuts the modules that card pages share with those screens
   (listing-picture, feed-page, price-basis, the unit labels, the badge) into separate small
   chunks: `/` reads 17.03 KiB beyond the entry against 16.01 KiB with the badge inline, and the
   entry's preload map names the new chunks (the entry's +0.1 KiB, so every page's +0.1).

My estimate was wrong in two places: the tier code measures 1.0 KiB, not 0.5 to 0.7, and I did
not foresee that keeping the flag off the five non-card screens re-splits the shared chunks.

The stylesheet stands at +999 B, 25 B under the 1 KiB stop. Part 4 (the invite card) still needs
a `bg-invite` utility and its `--color-invite` mapping, the disc's three sizes and the button's
radius; my estimate is +40 to +80 B, which takes the stylesheet over 1 KiB. So part 4 meets the
same stop.

## The question (options for a ruling)

- **A. Accept the measured growth with these causes.** Raise each card page's ceiling by DEC-296
  in part 8, and accept the stylesheet going over 1 KiB in part 4 (the invite card's utilities,
  named). Card pages +2.6 KiB, non-card screens −1.0 to −5.8 KiB, every page +0.1.
- **B. Keep the card chunk whole.** Put NegotiableBadge back in listing-card.tsx. Card pages go to
  +1.6 KiB (still over 1 KiB), and the five non-card screens carry the flag (+0.9 to +1.0 KiB).
  This conflicts with ruling 1 and CF-TIER-3 as planned.
- **C. Trim first, then measure again.** Shrink the tier code (shorter class sets, the word's
  stars sharing the flag's drawing, fewer per-tier objects). I cannot promise it gets under
  1 KiB: items 1 and 3 alone are +1.5 KiB.
- **D. A later turn groups the shared modules into one chunk** through the bundler's chunk
  settings (vite.config.ts, outside this turn's scope). That would win back most of item 3. This
  turn would then go ahead under A or B, with the ceiling lines naming that turn.

Contrast so far (ruling 2, the token values; the in-page measurement in part 7 is still owed): the
dark end stops now fall on the rolled caps (the satin is spaced so 7 % and 92 % sit where the band
leaves the picture). The 92 % stops were raised: gold `--ribbon-gold-5` from L 0.651 to
`oklch(0.671 0.122 76.5)` (ink 4.17 → 4.51 : 1), sage `--ribbon-sage-5` from L 0.543 to
`oklch(0.61 0.084 163.7)` (3.43 → 4.50 : 1). Pearl and dark pearl were unchanged (≥ 4.5 at every
visible stop), and no 7 % stop moved.

Known local limit, unrelated to this turn: `scripts/ci/nightly-hour.test.ts` NH-6 fails on this
Mac (its `date` ignores `TZDIR`); CI runs Linux. Nothing in this turn touches it.
