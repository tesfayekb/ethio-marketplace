# sage-s5-ad-page — the supervisor's ruling on the plan (as pasted by the operator)

```text
RULING on the S5 plan. Base: dev e3a6dfd2. Approved with these answers; one pull request in your order.
1. Yes: tiers on the buyer's page only this turn; `tier` optional on the view (null = not known, the free look, no data-tier). The seller's own page, the wizard preview and the staff pages come in a later turn with the my_listing migration; name them under "left for a later turn" with the file:line of each read.
2. loadOnce on demand, as you recommend; a failed download logs through the on-demand reporter and the bar keeps its CSS fallback offset. The first download stays unchanged.
3. Yes: BAND_TAB / BAND_TAB_CURRENT may build on CURRENT_PILL. The band-row.ts comment is stale (the panel tabs already read it, design-foundation.md "Sage S2"); correct the comment to name its three readers.
4. (a) agreed, no initials disc this turn; (b) agreed, Show contact keeps its size and width — colour, ink and shadow only; its full-width 48 px form is a question for the operator's walk, filed as a D-item in the report; (c) agreed, no inner padding (heights are fixed); (d) agreed, a decorative aria-hidden overlay with pointer-events none, so the map stays usable.
5. Yes: negotiable-badge.tsx joins the scope for a `tone` prop (one mechanism, a parameter); the Premium chip takes the tier chip tokens.
6. Accepted: the dark values in your table, and D262's token for the dark Premium title fill (the landed tokens govern over §13's literals).
7. Accepted: the stylesheet growth on every page with its cause (the ad page's tier tokens and rules), every page left in the band raised by DEC-296's form, each line naming it.
K2 filed: app-shell.tsx :591's own sub-band read (a later consumer of watchChromeTop); the `as unknown as` in server/ad-page.ts :34 (a typed parse, later); feed-page.ts :87's private tier list (CARD_TIERS, later); listing-page.tsx :492 not passing the tier it holds (the staff turn); listing-detail.tsx's 1,453 lines and ad-page.spec.ts's 41 tests (split in their own turns).
continue
```
