# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 40580864742 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40580864742
- Commit: `e2287d6d03327474e3666789f8dd85d80ed6bba4`
- Attempt: 1
- Written (UTC): 2026-10-27T21:50:49.795Z
- Post-test warnings: 3
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (1 of 1 results files read, 1 of 1 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: flake · unavailable: none

1 line(s), 1 message(s): 1 off the allowlist, 0 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `insert or update on table <q> violates foreign key constraint <q>` | 1 | flake |

Quiet (allowlisted): none

Off the allowlist:

### insert or update on table <q> violates foreign key constraint <q>

- Count: 1 · Sources: flake
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): ALS-1 the Location box keeps its height when the still map arrives ×1 · AP-46 Save and Share sit in the title box ×1

```text
[WebServer] [ssr-error] /api/listings/view insert or update on table "listing_counters" violates foreign key constraint "listing_counters_listing_id_fkey"
```

## Accessibility (DEC-084, gating)

Logs read: flake · unavailable: none

No `[a11y]` lines in any source (all 1 logs read).

## Timing (DEC-087, non-gating)

Results read: flake · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| flake | 2026-10-27T21:46:40.963Z | 4.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 120 | 21.9 min | flake |
| `ad-page-layout.spec.ts` | 24 | 5.5 min | flake |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `ad-page.spec.ts` › AP-37 the in-page bar scrolls to each section and stays under the sub-band | mobile-360 | 23.2 s |
| `ad-page.spec.ts` › AP-37 the in-page bar scrolls to each section and stays under the sub-band | mobile-360 | 23.0 s |
| `ad-page.spec.ts` › AP-37 the in-page bar scrolls to each section and stays under the sub-band | mobile-360 | 22.3 s |
| `ad-page.spec.ts` › AP-37 the in-page bar scrolls to each section and stays under the sub-band | mobile-360 | 22.1 s |
| `ad-page.spec.ts` › AP-37 the in-page bar scrolls to each section and stays under the sub-band | mobile-360 | 20.8 s |
| `ad-page.spec.ts` › AP-37 the in-page bar scrolls to each section and stays under the sub-band | mobile-360 | 20.2 s |
| `ad-page.spec.ts` › AP-37 the in-page bar scrolls to each section and stays under the sub-band | mobile-360 | 20.2 s |
| `ad-page.spec.ts` › AP-37 the in-page bar scrolls to each section and stays under the sub-band | mobile-360 | 20.2 s |
| `ad-page.spec.ts` › AP-37 the in-page bar scrolls to each section and stays under the sub-band | mobile-360 | 19.8 s |
| `ad-page.spec.ts` › AP-37 the in-page bar scrolls to each section and stays under the sub-band | mobile-360 | 19.4 s |
| `ad-page.spec.ts` › AP-37 the in-page bar scrolls to each section and stays under the sub-band | mobile-360 | 19.0 s |
| `ad-page.spec.ts` › AP-36 the layout follows the article's width (DEC-192, drawings v13) | mobile-360 | 18.4 s |
| `ad-page.spec.ts` › AP-36 the layout follows the article's width (DEC-192, drawings v13) | mobile-360 | 18.4 s |
| `ad-page.spec.ts` › AP-42 a missing box gives its room to its row | desktop-1280 | 18.2 s |
| `ad-page.spec.ts` › AP-42 a missing box gives its room to its row | desktop-1280 | 18.1 s |
