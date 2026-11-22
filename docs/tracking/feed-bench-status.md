# Feed bench (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45026355366
- Commit: 9d9748da37bdacda648d3f1a9888bf831dab8b07
- Timestamp (UTC): 2026-11-22T13:37:50.460Z
- Verdict: PASS
- Listings seeded: 100500 · seed 1190.6 s (sellers 123.5 s, listings 1002.7 s) · cleanup 239.7 s · leftovers 0 · sellers 2048 · market QM free 50

| Shape | Runs | p50 ms | p95 ms | Max ms | Cards |
| --- | --- | --- | --- | --- | --- |
| all, everywhere | 30 | 1.99 | 2.08 | 2.10 | 20 |
| top, country | 30 | 2.08 | 2.50 | 2.52 | 20 |
| leaf, city | 30 | 2.09 | 2.26 | 2.29 | 20 |
| top, city, widening | 30 | 2.22 | 2.48 | 3.08 | 20 |
| page 50 by cursor | 30 | 2.90 | 3.28 | 3.58 | 20 |
| guest host, country | 30 | 2.06 | 2.21 | 2.23 | 20 |

- Page size (all categories, everywhere): 15006 bytes (target ≤ 30720)
- Targets (D101 §5, DEC-166): p95 ≤ 50 ms per shape; one page ≤ 30,720 bytes.
- Not measured here: the cached first page's time to first byte (≤ 100 ms) needs the published site; the first page on slow 3G (≤ 1.5 s) needs a browser.
