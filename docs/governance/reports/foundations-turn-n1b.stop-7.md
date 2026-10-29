# Foundations N1b-1 — stop 7 (M6, job_call's timeout — the route needs it)

CI: newest completed run 6f4330f7 — CANCELLED (no verdict); newest with a verdict 8cceeee8 — SUCCESS.

- Why the route needs it: job_call posted with `timeout_milliseconds := 10000`. The route's run makes up to 20 model calls of up to 15 s each (`name_check` timeoutMs). If pg_net drops the connection at 10 s, the worker can lose the request part-way: names asked but not marked, the lease held until it expires, and the run never finished. The route will stop starting new names at 40 s of elapsed time, so the worst case is about 55 s. The pg_net timeout becomes 60 s.
- File: `supabase/migrations/20261029074846_5b5658e1-90fe-4f91-b351-ee24134c3bc6.sql` (4121 bytes, sha256 2993f237…). Mark 20261030003000.
- Redeclared whole from live `pg_get_functiondef` (md5 b6e4a752…); the one changed line is the timeout. Argument list unchanged, no DROP (G39); closers in-file.
- Proof (rolled back whole; INC-980 — reads only the run its own call returns): TO-1 the definition carries 60000 and no 10000; TO-2 service-only ACL; TO-3 with no Vault entries a call writes 'not_configured' and queues nothing; rollback check.
- Prod: applied; mark 20261030003000.
- Linter: 234 pre-existing warnings, none new.
- House form recorded as ruled (stop 6): a proof of a statement that spans a whole table runs a service-only core with an optional id scope; only the live wrapper spans real rows. Goes in docs/conventions.md with the route landing.

apply 5b5658e1 → expect mark 20261030003000

Next (no further database change planned): the route, the core, the jobs guard (S4 and S5's CI halves), NCJ-1…10, the whole unit suite, the final report.
