# Feed bench (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38114707122
- Commit: 46f5549c02cae1b8a19d095b3408d8601d0fa37d
- Timestamp (UTC): 2026-10-11T05:51:18.067Z
- Verdict: PASS
- Listings seeded: 100500 · seed 352.9 s · cleanup 434.3 s · leftovers 0

| Shape | Runs | p50 ms | p95 ms | Max ms | Cards |
| --- | --- | --- | --- | --- | --- |
| all, everywhere | 30 | 2.47 | 2.81 | 3.35 | 20 |
| top, country | 30 | 1.49 | 2.16 | 2.75 | 20 |
| leaf, city | 30 | 1.54 | 1.87 | 2.01 | 20 |
| top, city, widening | 30 | 1.56 | 1.89 | 2.24 | 20 |
| page 50 by cursor | 30 | 2.04 | 2.21 | 2.28 | 20 |
| guest host, country | 30 | 1.42 | 1.83 | 1.88 | 20 |

- Page size (all categories, everywhere): 11341 bytes (target ≤ 30720)
- Targets (D101 §5, DEC-166): p95 ≤ 50 ms per shape; one page ≤ 30,720 bytes.
- Not measured here: the cached first page's time to first byte (≤ 100 ms) needs the published site; the first page on slow 3G (≤ 1.5 s) needs a browser.
