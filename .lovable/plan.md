# Turn B (Sage S3) — plan: feed heading, listing card, dark-card choice (D262)

## CI first
- Last completed run read at the raw ci-evidence addresses: **4a4ee518, FAILURE** (run 41185234744), one job: first-paint budget, `/admin/listings_/$listingId_/edit` 404.8 / 405 in the NEAR band. That red is already fixed on d04eb489 (ceiling 406, verified in the request). E2E passed on that run (19/19 logs, 0 off allowlist).
- The run on **d04eb489** (first run of DEC-313's start) had not completed at plan time. The build reads it again at Part A; any red is fixed first, at its root, before step 1.

## 1. Dark card values (CONCERN 1) — the choice, not a guess
Page `--background` #121815. Ratios measured (WCAG relative luminance) this turn; all ESTIMATE until the operator judges.

| Candidate | `--card` | vs page | text #E6EAE7 | muted #A3B0A8 | edge ring | edge vs page |
|---|---|---|---|---|---|---|
| today | #1A221E | 1.11 | 13.39 | 7.23 | #26302B | 1.32 |
| A (quiet) | #232E28 | 1.28 | 11.58 | 6.25 | #3A4740 | 1.85 |
| B (middle) | #25302A | 1.32 | 11.26 | 6.08 | #3E4B44 | 1.97 |
| C (strong) | #28342E | 1.39 | 10.67 | 5.76 | #42504A | 2.12 |

Tier fills, same three steps (today: Premium #2B2314 = 1.16, Featured #1A2C23 = 1.22):

| Candidate | Premium fill | vs page | ink #E6B655 | Featured fill | vs page | word #7FC9A6 |
|---|---|---|---|---|---|---|
| A | #33291A | 1.26 | 7.60 | #1F3329 | 1.34 | 6.91 |
| B | #382D1C | 1.34 | 7.17 | #22362C | 1.40 | 6.62 |
| C | #3A2F1D | 1.37 | 6.97 | #243A2F | 1.47 | 6.28 |

Knock-on found: dark `--photo-empty` #26302B equals the new card (1.00–1.05). The empty well takes #303C35 (1.12–1.22 against A–C) so it still reads as a well; measured per candidate in the build.

Shadow: dark `--lift-card` keeps its black drop (it shows on photos and tiers, not the page) and its 1 px ring moves to the candidate edge value. `-md` / `-lg` dark lifts get the same ring.

**/dev/style**: a dark card grid with three columns A / B / C (plain, Premium, Featured, no-photo card each), scoped by a `data-card-candidate` attribute that sets the candidate tokens locally; the live `.dark` block takes **B** as the provisional value until the operator picks. His pick lands as a one-line token change in the next turn (or this one if he rules before the push).

Census of CARD_SURFACE / `bg-card` readers (all take the new dark values through the token, no per-file change): listing-card, feed, invite card, page-card, section, data-table (card mode), on-demand-notice, safety-box, listing-detail, locations-overview, admin-nav, app-shell. my-listings and the ad page boxes reach it through page-card / listing-card / section. K2: any reader painting `bg-card` with its own border instead of the shadow is reported, not edited.

## 2. Spec parts and their tokens
§5 feed heading (`feed.tsx` :286): `text-[21px] md:text-[25px] lg:text-[30px] font-extrabold tracking-[-0.9px]` via a `--feed-heading-*` size step set in styles.css; place name in `text-primary`. Grid gap `lg:gap-5`; main `lg:py-7`.
§6 card (`listing-card.tsx`, `listing-picture.tsx`, `surface.ts`):
- body padding 13/14/14 px (`--card-pad-*`), compact 8–9 tablet, 6–7 phone;
- price 16 px bold, compact 13 / 12 px bold; price slot min heights kept;
- Negotiable: filled pill `bg-success-soft text-tier-featured-ink` 11 px semibold, no border (dark reads `--success-soft` #1C2B24 / `--leaf-ink`, ratio checked);
- place line: divider `--card-rule` (light #EEF3EF, dark from the candidate set) as an inset top shadow, 9 px / 6 px compact top padding, pin `text-leaf-ink`;
- empty picture well: `bg-photo-empty` + bottom separator token `--lift-photo-empty`.

## 3. The one-line heading (INC-957's class)
Mechanism named: **ONE_LINE_SLOT** — a fixed fit rule, not a shrinking loop. The slot is `whitespace-nowrap min-w-0`; the fixed words ("Listings in") never cut; the place name is the only part that may cut, through the existing CutText (cut-names rule). `wrap-anywhere` leaves the h1.
- Lives beside CUT names in src/components/layout (one constant + CutText), registered in mechanisms.md; E (every one-line slot) reuses it unchanged.
- Guard: CF-ONE-LINE-1 census (a slot marked `data-one-line` must use ONE_LINE_SLOT); planted case: a slot with `wrap-anywhere` fails.
- Test: `e2e/sage-cards.spec.ts` OL-1 at 360 for every public language in the catalog (en, am, om, ti), both e2e projects' device fonts: the h1's height equals one line box and `scrollWidth <= clientWidth` for its fixed words. OL-2 planted: a route mock supplies a 60-character place name; the fixed words stay on one line and the name cuts. A unit OL-3 plants a heading class without the rule and the census fails.

## 4. Laws kept, G38
LL-1, one card shape and `auto-rows-fr` stay true; LL-1 re-run in both themes. Tests that read old card values, named old → new in the build after reading each: `src/look-law.test.ts`, `scripts/conformance/look-values.test.ts`, `src/lib/themes.test.ts` (dark `--card`, `--lift-card`, `--photo-empty`, tier fills), `src/components/shell/data-table.test.tsx` (card surface), and any spec asserting `text-xl font-semibold` on the h1 or 14 px price (sage-shell / sage-bands census in the build).

## 5. sage-cards.spec.ts
Per redesign-part-2 §6: computed styles at 390, 834, 1440, light and dark — heading size/weight/tracking/colour of place, body padding, price size/weight, Negotiable fill/ink/no border, divider shadow and padding, empty-well fill, card background and box-shadow ring, contrast ratios computed in-page against the targets (≥1.25, ≥1.8, ≥4.5). Run via `bun run e2e:local -- e2e/sage-cards.spec.ts`, both projects, retries 0; added to scripts/e2e-select.ts.

## 6. Growth
ESTIMATE +0.15 KiB on public pages (classes + the /dev/style grid off the public path). Any page entering its NEAR band gets `ceilingFor(size)` in DEC-296's form, listed in the report.

## 7. Turns
One turn. If it cannot fit, B1 = dark candidates + /dev/style grid + token tests; B2 = §5/§6 parts, ONE_LINE_SLOT, sage-cards.spec.

## Build order
Part A (CI) → step 0 brief → tokens + candidates → /dev/style grid → §6 card → §5 heading + ONE_LINE_SLOT + guard → G38 test updates → sage-cards.spec → report → `bun run checks` → CI re-read → push.
