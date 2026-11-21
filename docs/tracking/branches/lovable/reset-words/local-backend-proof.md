# Local backend proof (non-gating)

- Commit: `7ad2d0d862da0fde39076010e76a4ea5a6dfc38e`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44863862231

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| email | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| webkit | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| 1 | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| 2 | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| 3 | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| 4 | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| 5 | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| 6 | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| 7 | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| 8 | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| 9 | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| 10 | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| 11 | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| 12 | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| 13 | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| 14 | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| 15 | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| 16 | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 0 | 0 | 0 | 0 | 0 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: none 0 s
- Repeat lane (DEC-283): Repeat: selection not written
- Database session samples during each start (INC-944): smoke not run, email not run, webkit not run, 1 not run, 2 not run, 3 not run, 4 not run, 5 not run, 6 not run, 7 not run, 8 not run, 9 not run, 10 not run, 11 not run, 12 not run, 13 not run, 14 not run, 15 not run, 16 not run, repeat not run
- Lane plan (DEC-375 b): no evidence; planned/test seconds: 1 ?/not run, 2 ?/not run, 3 ?/not run, 4 ?/not run, 5 ?/not run, 6 ?/not run, 7 ?/not run, 8 ?/not run, 9 ?/not run, 10 ?/not run, 11 ?/not run, 12 ?/not run, 13 ?/not run, 14 ?/not run, 15 ?/not run, 16 ?/not run
- Teardown:
  - smoke: not found
  - email: not found
  - webkit: not found
  - 1: not found
  - 2: not found
  - 3: not found
  - 4: not found
  - 5: not found
  - 6: not found
  - 7: not found
  - 8: not found
  - 9: not found
  - 10: not found
  - 11: not found
  - 12: not found
  - 13: not found
  - 14: not found
  - 15: not found
  - 16: not found
  - repeat: not found
- Working copy:
not written
- Parity:
not written
- Status:
not written

## Lane smoke
- Step failure:
Step install-dependencies: outcome failure
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [8]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::warning title=ci-retry::bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [0]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::error title=ci-deadline::bun install --frozen-lockfile failed with exit 1 on try 2 of 2
- No JSON results; smoke skipped

## Lane email
- Step failure:
Step install-dependencies: outcome failure
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [8]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::warning title=ci-retry::bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [0]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::error title=ci-deadline::bun install --frozen-lockfile failed with exit 1 on try 2 of 2
- No JSON results; smoke skipped

## Lane webkit
- Step failure:
Step install-dependencies: outcome failure
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [8]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::warning title=ci-retry::bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [0]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::error title=ci-deadline::bun install --frozen-lockfile failed with exit 1 on try 2 of 2
- No JSON results; smoke skipped

## Lane 1
- Step failure:
Step install-dependencies: outcome failure
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [8]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::warning title=ci-retry::bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [0]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::error title=ci-deadline::bun install --frozen-lockfile failed with exit 1 on try 2 of 2
- No JSON results; smoke skipped

## Lane 2
- Step failure:
Step install-dependencies: outcome failure
  [0.04ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [8]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::warning title=ci-retry::bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [0]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::error title=ci-deadline::bun install --frozen-lockfile failed with exit 1 on try 2 of 2
- No JSON results; smoke skipped

## Lane 3
- Step failure:
Step install-dependencies: outcome failure
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [8]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::warning title=ci-retry::bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [0]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::error title=ci-deadline::bun install --frozen-lockfile failed with exit 1 on try 2 of 2
- No JSON results; smoke skipped

## Lane 4
- Step failure:
Step install-dependencies: outcome failure
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [8]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::warning title=ci-retry::bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [0]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::error title=ci-deadline::bun install --frozen-lockfile failed with exit 1 on try 2 of 2
- No JSON results; smoke skipped

## Lane 5
- Step failure:
Step install-dependencies: outcome failure
  [0.03ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [8]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::warning title=ci-retry::bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
  [0.03ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [0]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::error title=ci-deadline::bun install --frozen-lockfile failed with exit 1 on try 2 of 2
- No JSON results; smoke skipped

## Lane 6
- Step failure:
Step install-dependencies: outcome failure
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [8]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::warning title=ci-retry::bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [0]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::error title=ci-deadline::bun install --frozen-lockfile failed with exit 1 on try 2 of 2
- No JSON results; smoke skipped

## Lane 7
- Step failure:
Step install-dependencies: outcome failure
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [8]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::warning title=ci-retry::bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [0]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::error title=ci-deadline::bun install --frozen-lockfile failed with exit 1 on try 2 of 2
- No JSON results; smoke skipped

## Lane 8
- Step failure:
Step install-dependencies: outcome failure
  [0.03ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [8]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::warning title=ci-retry::bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [0]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::error title=ci-deadline::bun install --frozen-lockfile failed with exit 1 on try 2 of 2
- No JSON results; smoke skipped

## Lane 9
- Step failure:
Step install-dependencies: outcome failure
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [8]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::warning title=ci-retry::bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [0]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::error title=ci-deadline::bun install --frozen-lockfile failed with exit 1 on try 2 of 2
- No JSON results; smoke skipped

## Lane 10
- Step failure:
Step install-dependencies: outcome failure
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [8]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::warning title=ci-retry::bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [0]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::error title=ci-deadline::bun install --frozen-lockfile failed with exit 1 on try 2 of 2
- No JSON results; smoke skipped

## Lane 11
- Step failure:
Step install-dependencies: outcome failure
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [8]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::warning title=ci-retry::bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [0]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::error title=ci-deadline::bun install --frozen-lockfile failed with exit 1 on try 2 of 2
- No JSON results; smoke skipped

## Lane 12
- Step failure:
Step install-dependencies: outcome failure
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [8]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::warning title=ci-retry::bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [0]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::error title=ci-deadline::bun install --frozen-lockfile failed with exit 1 on try 2 of 2
- No JSON results; smoke skipped

## Lane 13
- Step failure:
Step install-dependencies: outcome failure
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [8]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::warning title=ci-retry::bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [0]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::error title=ci-deadline::bun install --frozen-lockfile failed with exit 1 on try 2 of 2
- No JSON results; smoke skipped

## Lane 14
- Step failure:
Step install-dependencies: outcome failure
  [0.03ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [8]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::warning title=ci-retry::bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
  [0.03ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [0]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::error title=ci-deadline::bun install --frozen-lockfile failed with exit 1 on try 2 of 2
- No JSON results; smoke skipped

## Lane 15
- Step failure:
Step install-dependencies: outcome failure
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [8]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::warning title=ci-retry::bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [0]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::error title=ci-deadline::bun install --frozen-lockfile failed with exit 1 on try 2 of 2
- No JSON results; smoke skipped

## Lane 16
- Step failure:
Step install-dependencies: outcome failure
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [8]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::warning title=ci-retry::bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [0]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::error title=ci-deadline::bun install --frozen-lockfile failed with exit 1 on try 2 of 2
- No JSON results; smoke skipped

## Lane repeat
- Step failure:
Step install-dependencies: outcome failure
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [8]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::warning title=ci-retry::bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
  [0.02ms] ".env"
  bun install v1.3.14 (0d9b296a)
  Resolving dependencies
  Resolved, downloaded and extracted [0]
  error: lockfile had changes, but lockfile is frozen
  note: try re-running without --frozen-lockfile and commit the updated lockfile
  ::error title=ci-deadline::bun install --frozen-lockfile failed with exit 1 on try 2 of 2

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
