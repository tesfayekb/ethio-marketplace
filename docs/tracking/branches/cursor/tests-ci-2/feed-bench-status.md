# Feed bench (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44896403216
- Commit: 3be465ac31ca38439923ec5061a9fb83bfd459e1
- Timestamp (UTC): 2026-11-21T11:17:55.188Z
- Verdict: PASS
- Listings seeded: 100500 · seed 1329.9 s (sellers 116.0 s, listings 1183.7 s) · cleanup 157.1 s · leftovers 0 · sellers 2048 · market QM free 50

| Shape | Runs | p50 ms | p95 ms | Max ms | Cards |
| --- | --- | --- | --- | --- | --- |
| all, everywhere | 30 | 2.36 | 3.07 | 3.24 | 20 |
| top, country | 30 | 2.69 | 3.50 | 3.56 | 20 |
| leaf, city | 30 | 2.56 | 3.03 | 3.11 | 20 |
| top, city, widening | 30 | 2.66 | 3.39 | 3.44 | 20 |
| page 50 by cursor | 30 | 3.89 | 4.51 | 7.04 | 20 |
| guest host, country | 30 | 2.45 | 2.98 | 6.85 | 20 |

- Page size (all categories, everywhere): 15006 bytes (target ≤ 30720)
- Targets (D101 §5, DEC-166): p95 ≤ 50 ms per shape; one page ≤ 30,720 bytes.
- Not measured here: the cached first page's time to first byte (≤ 100 ms) needs the published site; the first page on slow 3G (≤ 1.5 s) needs a browser.
