# Feed bench (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41325291433
- Commit: e3a6dfd22a19e15bbfd386d68e7b478a6af98f72
- Timestamp (UTC): 2026-11-01T16:23:48.677Z
- Verdict: PASS
- Listings seeded: 100500 · seed 384.4 s · cleanup 150.0 s · leftovers 0

| Shape | Runs | p50 ms | p95 ms | Max ms | Cards |
| --- | --- | --- | --- | --- | --- |
| all, everywhere | 30 | 1.93 | 2.62 | 2.66 | 20 |
| top, country | 30 | 1.86 | 2.62 | 2.69 | 20 |
| leaf, city | 30 | 1.86 | 3.65 | 3.76 | 20 |
| top, city, widening | 30 | 2.20 | 3.52 | 3.78 | 20 |
| page 50 by cursor | 30 | 2.02 | 2.59 | 3.18 | 20 |
| guest host, country | 30 | 2.97 | 3.21 | 3.24 | 20 |

- Page size (all categories, everywhere): 13401 bytes (target ≤ 30720)
- Targets (D101 §5, DEC-166): p95 ≤ 50 ms per shape; one page ≤ 30,720 bytes.
- Not measured here: the cached first page's time to first byte (≤ 100 ms) needs the published site; the first page on slow 3G (≤ 1.5 s) needs a browser.
