# Turn SAGE-S5 — the ad page in the Sage look, by tier (the task)

```text
Task: sage-s5-ad-page. Base: dev e3a6dfd22. PLAN FIRST: read, census and plan; change nothing until the operator pastes the supervisor's ruling on your plan.

Turn SAGE-S5: the ad page in the Sage look, by tier. Tier B (the page a buyer lands on from a search, a share or a link; the same component draws the posting preview and the seller's own ad page). No migration, no new dependency. New strings only if the plan shows one is needed.

THE SOURCES (read whole before planning):
- docs/governance/sage/sage-3d-style-change-spec.md §12 (the ad page: the colour rule — only the title box tinted on a paid ad, every other box white with the tier frame, accents inside the ad body in the tier colour, the safety box never re-coloured; the parts table; the flag and ribbon pinned to the main photo's corners; the segmented section bar, R9), §7, §8, §13.
- docs/governance/plans/redesign-part-2.md, the S5 row (placement fixed by DEC-200/201: only colour, shadow, radius and type change; ad-page.spec.ts placement tests unchanged; new sage-ad-page.spec.ts; growth ESTIMATE +0.2 KiB, ad page only).
- The S4 report, docs/governance/reports/sage-s4-tiers.report.md, "left for S5": the ad page's main photo takes its tier palette, the flag and the uncut caps (photo-gallery.tsx clips the rolled caps; public-listing.ts's client mapping carries no tier though the SQL returns it).
- docs/features/design-foundation.md, docs/governance/mechanisms.md (card-tier.ts and the ribbon as S4 left them; row 85 visibleArea; CARD_SURFACE; the press).
- roadmap.md's open line: "Ad-page turn (S5): listing-detail.tsx :524 reads the sticky sub-band itself → visibleArea" — the section bar's sticky offset is computed by the page's own observer (listing-detail.tsx :5xx, --listing-nav-top) instead of the one visible-area reader (src/lib/visible-area.ts, row 85). This turn moves it onto the mechanism.

THE SYSTEM (G0) your plan must answer:
- CONCERN 1: a paid ad's page draws its tier (title tint, frames, accents, tier tag, the flag and the ribbon on the main photo) from the S4 mechanism (card-tier.ts's look map, tier-flag.tsx, the ribbon palette by data-ribbon), extended by what the page needs — never a second map of tier colours. Every consumer by definition, file:line: the ad page, the posting preview, the seller's own ad page, similar ads.
- CONCERN 2: the sticky section bar's offset comes from visibleArea (row 85), the page's own observer retired; the segmented bar (R9) reads the band segment constants (band-row.ts BAND_SEGMENT, CURRENT_PILL) rather than its own pill classes.
- CONCERN 3: the ad document carries its tier to the client through public-listing.ts's mapping (a typed field, never a sentinel), so the page can colour; the preview and the seller page get it the same way.
- The guard: CF-TIER-1 extended to the page's files (planted); CF-AREA-1 covers the new reader; placement tests unchanged (DEC-200/201).

PLAN WITH: the census; each part of §12's table marked "colour/shadow/radius/type only" or "needs a structural change" (a structural change is a STOP before code: placement is fixed); the mechanism extensions; the tokens to add, light and dark; the guard; the tests (sage-ad-page.spec.ts at 390, 834 and 1440, light and dark, for a free, a Premium and a Featured ad: the title box, another box's frame, Show contact's fill and ink with contrast measured, the links' ink, the tier tag, the flag and the ribbon on the photo's corners, the section bar's current segment, the safety box unchanged; the placement tests in ad-page.spec.ts green and unchanged; G38 named old → new); growth per page (the ad page, the preview's page, the seller page; DEC-296's form); one pull request or two.

SCOPE (by area; your plan names the files): src/routes/l.$slug.tsx; src/features/posting/preview/ (listing-detail.tsx, photo-gallery.tsx and their tests); src/features/ad-page/ (safety-box.tsx, report-ad.tsx, similar-ads.tsx, each with its tests); src/server/ or src/lib/ where public-listing.ts lives, with its tests; src/components/marketplace/ (card-tier.ts, tier-flag.tsx, listing-picture.tsx) if the extension needs them; src/components/shell/band-row.ts if the segmented bar needs a variant; src/lib/visible-area.ts and its tests; src/styles.css, src/lib/themes.ts, src/lib/schemas/theme.ts and their tests; scripts/conformance/ and allowlists; scripts/route-budgets.mjs, scripts/check-bundle-size.mjs; scripts/e2e-select.ts; e2e/ (the new spec, ad-page.spec.ts and the G38 specs); docs/features/design-foundation.md, docs/governance/mechanisms.md, docs/_changelog.md, roadmap.md, the brief and the report. AGENTS.md is not in scope. A guard whose list or floor a change moves is in scope by that reason.
```
