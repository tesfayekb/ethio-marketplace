# sage-s4-tiers — the supervisor's ruling on stop 1 (as pasted by the operator)

```text
RULING — sage-s4-tiers, stop 1. Base: dev 043f8aa9.
1. A, with one bounded trim first: one pass over the tier code only (card-tier.ts, tier-flag.tsx, the card's tier branch), measured; if it saves under 0.3 KiB, keep what you have and say so. The badge split stays (ruling 1 governs, and the five non-card screens getting 1.0–5.8 KiB lighter is a net win for the site; say that in the report with the numbers).
2. The plan's "more than 1 KiB is a STOP" is a tolerance (G60): a measured growth with every cause named and nothing unexplained is reported, not refused. Report each page's change with its three causes (ribbon +0.5, tier +1.0, the chunk split +1.0 less any trim) and raise the crossed ceilings in part 8 by DEC-296's form.
3. The stylesheet: the same rule. Part 4 goes ahead; report its measured bytes and the cause (the ribbon palettes, the flag and the invite tokens).
4. D is queued as its own task after S4: the shared code grouped into one chunk in vite.config.ts, with its own DEC and measured before/after on every page. Name it under "left for a later turn" with today's numbers.
5. The contrast values: good. Part 7's in-page measurement stays owed.
continue
```
