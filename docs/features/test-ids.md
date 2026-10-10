# Test ids — assigned once (INC-536)

A test id ("PW-58", "C-1", "RP-13") is the record of a test: the flake ledger, the incident ledger, the docs and the CI reports name tests by it. An id on two tests makes every record that names it ambiguous, so an id is assigned once across src/, e2e/ and scripts/.

## The rule

- A new test takes the next free number of its prefix. Before naming a test, search the three folders for the prefix and take the highest number plus one.
- One id names one test. The only exception is a declared case group: several cases of one rule, in one file, each titled with the same id (`CASE_GROUPS` in scripts/test-ids.ts — today PW-61, PW-110 and PW-162).
- A title that opens with a record number (DEC-, INC-, REQ-, ACT-, MIG-) is not a test id.
- When two tests are found under one id, the test the incident ledger and the flake ledger name keeps the id; otherwise the older test keeps it. The other takes a free id, and the docs that name it follow in the same change. Ledger entries already written are not edited; this page is the later word.

## The check

scripts/test-ids.ts reads every `it(` / `test(` title (with `.skip`, `.only`, `.fixme` and `.fail`) that opens with an id, a compound title such as "A-1+A-2: …" counting each id. It reports an id found in two files, and an id found on two tests of one file that is not a declared case group. Its unit tests, scripts/test-ids.test.ts, run with `bun run test:unit`:

- TI-1 — the repository has no repeated id (red on `9c40c53f`, with the 19 ids below);
- TI-2 — an id in two files is refused;
- TI-3 — one id on two tests of one file is refused, unless the file declares the case group;
- TI-4 — a compound title counts each id; a record number is not a test id.

## The renames of 2026-10-10 (INC-536)

| Old id                                                 | File                                | New id              | Why the other test kept the id                                      |
| ------------------------------------------------------ | ----------------------------------- | ------------------- | ------------------------------------------------------------------- |
| A-1, A-2, A-3                                          | e2e/admin-shell.spec.ts             | A-6, A-7, A-8       | auth-signup's "A-1+A-2" and the nightly's A-3 are older             |
| C-1, C-2, C-3, C-4                                     | e2e/category-nav.spec.ts            | C-6, C-7, C-8, C-9  | auth-callback's C-1..C-4 are older                                  |
| R-1, R-2, R-3                                          | e2e/rbac.spec.ts                    | R-6, R-7, R-8       | auth-reset's R-1..R-3 are older                                     |
| R-4 ("recovery leaves an email identity in place")     | e2e/auth-reset.spec.ts              | R-9                 | docs/features/auth-password-recovery.md names the throttle test R-4 |
| RP-1, RP-2, RP-3                                       | src/lib/return-path.test.ts         | RP-13, RP-14, RP-15 | admin-roles' RP-1..RP-12 are older                                  |
| PW-58 (a year under Amharic)                           | e2e/post-wizard-specs.spec.ts       | PW-183              | the incident ledger names the commission test PW-58 (INC-367)       |
| PW-101 (the location details)                          | e2e/post-wizard-where.spec.ts       | PW-184              | the free-text test in post-wizard-specs keeps it                    |
| AT-21 (a links file sets the two per-link cells)       | e2e/admin-attributes-import.spec.ts | AT-78               | the change → commit → undo test is the AT-21 the docs list first    |
| TR-18 (the header renders while the read is in flight) | e2e/shell.spec.ts                   | TR-36               | the records name the redirect test TR-18 (INC-098b's trace)         |
| TR-28 (the account carries onto a starless device)     | e2e/shell.spec.ts                   | TR-37               | INC-523 and the flake watch name the hreflang test TR-28            |

Flake-ledger lines written before 2026-10-10 carry the old ids with the full test title, which identifies the test.
