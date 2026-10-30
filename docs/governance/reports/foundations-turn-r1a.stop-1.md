# Foundations turn R1a — stop 1 (time limit)

- Step 0: sha256 d63f27c2ac4f91ff6f3ac53f4ecb3be1a9b3116f313e2451f62a0a888b805402, proven. Roadmap line 3 names the brief.
- CI: the newest completed overall run in ci-status is b2940a61, FAILURE. The E2E evidence for f66ca04c (run 40981493608) passed, with 0 flaky, its repeat lane included.
  - PGH-E2 is green on f66ca04c, so PGH-E2 is unchanged (INC-715's rule retired, as ruled).
- INC-948:
  - No failing trace exists. The file passed whole on both projects locally before the fix (38/38), so the cause was read from the code instead.
  - Cause: three copies of a region walk in post-wizard-place.spec.ts (PW-30, PW-20 and chooseOneCity). Each selected a region, then read the city picker's options with a bare `count()`, which never waits. If the right region's cities drew a frame late, the walk passed that region and chose nothing, which gives data-count 0.
  - Fix: one in-file `pickCity` reads the city's own region from its row, then waits for each option before choosing it. No retry was added and no wait was raised.
  - Proof so far: the file whole, both projects, retries 0: 38 passed. PW-30 with --repeat-each 12 has NOT RUN.
- K2: the same racy walk in post-wizard-pricing.spec.ts :1039 and post-wizard-category.spec.ts :977. These were not touched.
- Left:
  - PW-30 ×12;
  - Part 0 (INC-1005: the measurement without --hide-scrollbars, the gutter rule, CF-SHIFT-1, OVS red then green);
  - R1b;
  - `bun run checks` (NOT RUN);
  - the final report.
