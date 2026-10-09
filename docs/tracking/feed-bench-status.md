# Feed bench (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37972277468
- Commit: 2ab35a33aabbde1e8ee410c474608ee41f04722e
- Timestamp (UTC): 2026-10-09T18:24:58.772Z
- Verdict: PASS
- Listings seeded: 100500 · seed 327.4 s · cleanup 84.1 s · leftovers 0

| Shape | Runs | p50 ms | p95 ms | Max ms | Cards |
| --- | --- | --- | --- | --- | --- |
| all, everywhere | 30 | 2.73 | 3.36 | 3.39 | 20 |
| top, country | 30 | 1.55 | 3.85 | 4.46 | 20 |
| leaf, city | 30 | 1.76 | 2.22 | 2.52 | 20 |
| top, city, widening | 30 | 1.89 | 2.57 | 2.73 | 20 |
| page 50 by cursor | 30 | 2.38 | 3.41 | 3.52 | 20 |
| guest host, country | 30 | 1.68 | 2.54 | 2.56 | 20 |

- Page size (all categories, everywhere): 11342 bytes (target ≤ 30720)
- Targets (D101 §5, DEC-166): p95 ≤ 50 ms per shape; one page ≤ 30,720 bytes.
- Not measured here: the cached first page's time to first byte (≤ 100 ms) needs the published site; the first page on slow 3G (≤ 1.5 s) needs a browser.
