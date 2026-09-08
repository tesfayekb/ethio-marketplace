# Claude supervisor instructions — amendment records

## Claude supervisor instructions v1.9 — amendments (append to §12)

G23 — Read before ruling, in full: no fix prompt without reading the decisive code path; trivial-query timeouts are read as queueing, not slowness; which queries fail matters more than how slow they are.
G24 — Every migration prompt carries the closers line; every landing prompt carries the DEC-023 local-run requirement and "commit only on green"; "commit" is never asked of the operator.
G25 — Executor capability questions are answered by the executor's own evidence (a census), never by a settings path the supervisor has not verified.
G26 — Walk findings outrank green tests: when the operator's walk contradicts a passing test, the test is fixed to see what the walk saw before anything else lands.
