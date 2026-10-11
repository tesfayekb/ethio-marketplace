# Feed bench (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38155403146
- Commit: dfd6555a8dbd6011d3b55f1d7bccc7765a434745
- Timestamp (UTC): 2026-10-11T16:34:53.895Z
- Verdict: PASS
- Listings seeded: 100500 · seed 364.7 s · cleanup 173.2 s · leftovers 0

| Shape | Runs | p50 ms | p95 ms | Max ms | Cards |
| --- | --- | --- | --- | --- | --- |
| all, everywhere | 30 | 2.36 | 3.29 | 3.63 | 20 |
| top, country | 30 | 1.69 | 3.24 | 3.60 | 20 |
| leaf, city | 30 | 1.71 | 2.10 | 2.85 | 20 |
| top, city, widening | 30 | 1.97 | 2.77 | 2.95 | 20 |
| page 50 by cursor | 30 | 1.74 | 2.14 | 2.17 | 20 |
| guest host, country | 30 | 1.70 | 2.04 | 2.44 | 20 |

- Page size (all categories, everywhere): 11342 bytes (target ≤ 30720)
- Targets (D101 §5, DEC-166): p95 ≤ 50 ms per shape; one page ≤ 30,720 bytes.
- Not measured here: the cached first page's time to first byte (≤ 100 ms) needs the published site; the first page on slow 3G (≤ 1.5 s) needs a browser.
