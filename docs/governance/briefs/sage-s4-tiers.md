# Turn SAGE-S4 — Premium and Featured cards, the status ribbon and the invite card (the task)

```text
Task: sage-s4-tiers. Base: dev 043f8aa9. PLAN FIRST: read, census and plan; change nothing until the operator pastes the supervisor's ruling on your plan.

Turn SAGE-S4: Premium and Featured cards, the status ribbon and the invite card in the Sage look. Tier B (every card in the feed, the category pages, saved ads, and similar ads on the ad page). No migration, no new dependency. New strings only if the plan shows one is needed; the supervisor then gives their text.

THE SOURCES (read whole before planning):
- docs/governance/sage/sage-3d-style-change-spec.md §7 (Premium and Featured cards: card fill, frame and glow, place-line divider, the white mini flag with its fold and stars, the tier word beside the place), §8 (the satin status ribbon, its colour by card type and mode, rolled ends, gloss, emboss) and §9 (the invite card), with §13 for the dark values.
- docs/governance/plans/redesign-part-2.md, the S4 row (a shared sprite; the flag; the tier word; the satin ribbon by tier and mode; the invite card; growth ESTIMATE +0.8 KiB with the sprite as its named cause) and §7 (G38).
- docs/features/design-foundation.md (Sage S3; the dark-card choice D262: card C is live, its tier fills #3A2F1D / #243A2F; D269: the Featured place line takes its own ink).
- docs/governance/mechanisms.md (CARD_SURFACE; the card's one shape; CF-LOOK-1; the press on cards, row 88's neighbours).

THE OPERATOR'S DECISIONS AND THE PLAN'S RULINGS ALREADY MADE:
- Tiers are walked on /dev/style's fixture grid; no SQL and no seeded production rows.
- The shared ribbon and flag drawing loads only on pages that draw cards (it never rides a page without one).
- Place, angle, size and words of the ribbon stay as today (§8); one card size and `auto-rows-fr` stay (LL-1).
- The tier strings exist (tier.premium, tier.featured, en and am); the stars are drawing, not text.

THE SYSTEM (G0) your plan must answer:
- CONCERN 1: a card's tier is drawn by one mechanism (fill, frame, flag, tier word, ribbon colour) from tokens, the same on every surface that draws a card (feed, category, saved, my listings if it shows tiers, similar ads). Name every consumer by definition, file:line.
- CONCERN 2: the ribbon and flag geometry live in one place (the sprite or module the plan names), with every gradient and colour as a token or a theme value (themes.ts, TH-2), never a literal in a component.
- The guard: what fails when a surface draws a tier or a ribbon its own way (CF-LOOK-1 extended, or a new census); planted cases.

PLAN WITH: the census; the mechanism and where it lives; the tokens to add (light and dark); the guard; the tests (computed styles at 390, 834 and 1440, light and dark, for a regular, a Premium and a Featured card: fill, frame layers, divider, flag present with its accessible name, tier word, ribbon palette by tier and mode; contrast of the tier word and the ribbon text measured in the page; the ribbon geometry tests unchanged; G38 named old → new); growth per page (measured on the base and the tree, DEC-296's form); and whether it fits one pull request or needs two.

SCOPE (by area; your plan names the files): src/components/marketplace/ (listing-card.tsx, listing-picture.tsx, invite-card.tsx, a new sprite or module) and their tests; every other surface that draws a card's tier, as your census finds; src/styles.css, src/lib/themes.ts, src/lib/schemas/theme.ts and their tests; src/routes/dev.style.tsx; scripts/conformance/ and their allowlists; scripts/route-budgets.mjs, scripts/check-bundle-size.mjs; scripts/e2e-select.ts for a new spec's area line; e2e/ (a new sage-tiers spec and the G38 specs); docs/features/design-foundation.md, docs/governance/mechanisms.md, docs/_changelog.md, roadmap.md, the brief and the report. AGENTS.md is not in scope. A guard whose list or floor a change moves is in scope by that reason.
```
