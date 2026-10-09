# Feed bench (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37915335446
- Commit: 5ae13599b1953df04138f605f24a3774979c2846
- Timestamp (UTC): 2026-10-09T10:09:52.588Z
- Verdict: FAILED (cleanup: delete scratch listings: Bad Request)
- Listings seeded: 100500 · seed 285.0 s · cleanup 0.3 s · leftovers 1

| Shape | Runs | p50 ms | p95 ms | Max ms | Cards |
| --- | --- | --- | --- | --- | --- |
| all, everywhere | 30 | 2.05 | 2.48 | 2.64 | 20 |
| top, country | 30 | 1.50 | 2.54 | 2.63 | 20 |
| leaf, city | 30 | 1.43 | 1.66 | 1.68 | 20 |
| top, city, widening | 30 | 1.57 | 1.89 | 2.57 | 20 |
| page 50 by cursor | 30 | 1.78 | 1.97 | 2.15 | 20 |
| guest host, country | 30 | 1.44 | 1.56 | 1.68 | 20 |

- Page size (all categories, everywhere): 11341 bytes (target ≤ 30720)
- Targets (D101 §5, DEC-166): p95 ≤ 50 ms per shape; one page ≤ 30,720 bytes.
- Not measured here: the cached first page's time to first byte (≤ 100 ms) needs the published site; the first page on slow 3G (≤ 1.5 s) needs a browser.
