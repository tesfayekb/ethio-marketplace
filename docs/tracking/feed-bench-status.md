# Feed bench (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43872334867
- Commit: a7d1b1ca971d6e19798561ff5b585cd3381f003d
- Timestamp (UTC): 2026-11-16T13:44:09.502Z
- Verdict: PASS
- Listings seeded: 100500 · seed 1925.1 s · cleanup 135.5 s · leftovers 0 · sellers 256 · market QM free 379

| Shape | Runs | p50 ms | p95 ms | Max ms | Cards |
| --- | --- | --- | --- | --- | --- |
| all, everywhere | 30 | 2.42 | 3.02 | 3.35 | 20 |
| top, country | 30 | 2.54 | 3.00 | 3.03 | 20 |
| leaf, city | 30 | 2.64 | 3.10 | 3.24 | 20 |
| top, city, widening | 30 | 2.61 | 3.48 | 3.61 | 20 |
| page 50 by cursor | 30 | 3.80 | 4.14 | 4.42 | 20 |
| guest host, country | 30 | 2.41 | 3.07 | 3.74 | 20 |

- Page size (all categories, everywhere): 15005 bytes (target ≤ 30720)
- Targets (D101 §5, DEC-166): p95 ≤ 50 ms per shape; one page ≤ 30,720 bytes.
- Not measured here: the cached first page's time to first byte (≤ 100 ms) needs the published site; the first page on slow 3G (≤ 1.5 s) needs a browser.
