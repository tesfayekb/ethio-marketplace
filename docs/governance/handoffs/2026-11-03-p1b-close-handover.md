# Handoff — 2026-11-03, plans and packages part 2 (P-1b) landed, applied, published and walked; P-1c decided; records turn R11

Written by the supervisor at records turn R11. The repository is the record (G53); this file only speeds up the next session's §2 ritual.

## 1. Heads

- dev `baa24c751` before this records turn (the merge of pull request #13, turn P-1b; its head `1b2037bfb` ran green, run 41612084959); main promotes to it on the merge's green run.
- ethio-prod and ethio-staging both stand at the P-1b marks `20261103160000`, `20261103170000`, `20261103180000`, `20261103190000` after P-1's `20261103000000`; every function's body equals its file on both (read back by md5 with CR stripped — INC-1043; eleven of eleven).
- The published site: the operator's Publish of 2026-11-03 05:2x New York, dev `baa24c751`; its walk passed 8 of 8 at 05:38.
- Side branches: eleven lovable-* (the known set) and `hold/executor-kit-install` (the Claude Code kit, not merged); `cursor/p1b-monetisation` deleted at the merge.
- The executor is Cursor on the operator's computer (DEC-318), Claude Fable 5.1 (High) for plans, Tier A builds and their fixes; Lovable is the reserve and holds Publish. The supervisor applies a migration without a DROP on ethio-staging through its connector; one with a DROP is the operator's hand from the raw link (DEC-323); the operator applies on ethio-prod after each merge, before Publish.

## 2. What this stretch built (block S86)

- P-1b, turn (a): M-a (the levels with perks, `level_overrides`, `level_perks_for`, three doors), M-b (`credit_cost`, `used_count`, `product_price_for`, `admin_edit_package_price`), M-c (the reach rows, `market_settings`, `admin_save_market_settings`, `admin_list_monetisation`), M-d (`validate_listing_draft` on `seller_plan`); CF-PLAN-1. Two reds on CI's temporary backend before any database was touched (INC-1044, INC-1045), each ruled into the same chat.
- P-1b, turn (b): Admin › Monetisation — one folder, one route, the group after Listings, the redirects, the Plans tile gone; 3 base + 74 admin keys EN + AM (the supervisor's Amharic, byte for byte), 15 retired; CF-PRICE-1 extended, CF-LEVEL-1 new; MON-1 → MON-15; the budgets by DEC-296's form; docs/features/plans.md.
- The walk (8 lines, all yes): the Ethiopia market row (10 free Regular ads, City, paid levels off) and one real Nationwide · Ethiopia price (credit cost 1) now exist on ethio-prod by the operator's hand.

## 3. Decisions to carry

- DEC-326 and DEC-327 (ruling 1): the P-1b shape as built — names on the product row, the season on `categories.visible_until`, `credit_cost` NOT NULL, no price row = not offered, the per-category rows with all four perks and one resolver, the staff reader with names, `tier` and `label_key` gone, the Posting caps block kept until P-2, `kind change` refused.
- DEC-322 → DEC-325: the size clause's reading; a DROP is the operator's hand on staging; rulings inline; the backend start gates the staging apply.
- D313: P-1c before P-2 — the admin Guide mechanism on every block (What this is · Each column · How to add, change or remove · What to do next; a conformance guard), the Monetisation order strip, Monetisation regrouped by product (Markets and Posting caps stay blocks). Plan first.
- The one missing refusal key, `admin.monetisation.error.overrideNotFound`, lands in this records turn with its Amharic.

## 4. Operator steps owed

- None for P-1b (applied, published, walked). Publish after each later merge; the ethio-prod applies at each migration stop.

## 5. Open items with owners

- Supervisor: the P-1c brief (D313; plan first); instructions v1.17 with the rules in force (docs/governance/instructions-amendments.md §"in force since v1.16"); the Cursor rules (DEC-322's wording, INC-1045's sixth pre-stop point, the commit-subject rule, the FINDINGS clause and the MODEL line); Knowledge v3.13 for the Lovable reserve.
- Executor (Cursor), in order: P-1c; P-2 (the ad's level and reach doors, the sweep, Promote, the free-slot rule at publish, the photo cap and lifetime onto the levels, the reach caps onto the reach product; the fold of the twelve `tier:` consumers onto the level rows — CF-LEVEL-1's allowlist expires there; `plan_photo_cap`'s literal and `coalesce(expiry_days, 60)`) with the housekeeping addendum (INC-1037, INC-1038 + CF-DIAL-1, INC-1039 / DEC-321, INC-1040's linter rule, INC-1042, the scanner sites #431/#432/#434–436 and the PR #11 comment, INC-443's allowlist hygiene); P-3 (credits); P-4 (payments).
- K2 debts (roadmap lines): the six spec-local `scratchHolder` helpers onto one e2e helper; `scripts/ci/turn-checks.ts` :269's doc-comment path; the entity type `product` in the translations doors when a third public language is enabled; the on-demand split of `category-glyphs` and `category-dialogs` out of /admin/monetisation's first download (a speed turn).
- Parked: the phone menu split (D255, after launch); the iPhone tick (dropped, D277); payments.

## 6. Next planned action

R11 lands (this turn); then the P-1c brief (plan first, Fable 5.1 High), then P-2 with the housekeeping addendum.
