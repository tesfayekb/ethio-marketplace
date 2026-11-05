# db-proof — ruling 2 (INC-1063: the stack's ports; rule 00's clause)

Base: dev c89271ca2

```text
RULING 2 — db-proof (DEC-343). Base: cursor/db-proof 4b9bb7bb7.
MODEL — Opus 5.5 High.

VERIFIED (fresh fetch): the five commits; db-proof.sh read whole; the extraction and the workflow's order (DEC-313); CF-DBP-1…4; rules 00/30/50/60; AGENTS.md; package.json. Your measurements are accepted. CI on 4b9bb7bb7 is DEC-343's admission judge; I read it when it completes — do not wait for it.

FIRST, before anything else: `bun run db:proof --stop`; paste its line.

1. INC-1063 (registered): the stack is NOT 127.0.0.1-only. The pinned CLI (supabase/cli v2.120.0) publishes every service port as `-p <hostPort>:<containerPort>` with no host address — apps/cli/src/command-internal/db-bootstrap/docker-create-args.ts :28/:184, postgres.service.ts :320/:402, kong.service.ts :264 — so Docker publishes on every interface of this computer. Rule 50's "at 127.0.0.1 only" and db-proof.sh's header state what nothing enforces. Concern: a service the executor starts is reachable only from this computer.
   a. Mechanism (NONE YET): db:proof checks it. Right after the start and BEFORE any migration applies — in all three start kinds (cold, restart, warm) — it reads every published port of the stack's containers from Docker itself (docker's port/inspect data for the project's containers, never the config file) and, if any mapping binds anything other than 127.0.0.1 or ::1, stops the stack with --no-backup and answers one line: `db:proof NOT RUN — the stack's ports are open beyond this computer: set Docker Desktop → Settings → Docker Engine "ip": "127.0.0.1", then run db:proof again`. db:proof never edits Docker's settings. The header and rule 50 name this check as what makes "127.0.0.1 only" true.
   b. Guard CF-DBP-5: the check exists and runs before `migration up` on every path; a planted copy without it, or with it after the apply, fails.
   c. Proof in the report (the operator has set the Docker Engine "ip" setting): one `bun run db:proof --fresh` → PASS; `docker ps --format '{{.Names}} {{.Ports}}'` for the stack's containers (ports only, never a key) — every mapping 127.0.0.1; and `lsof -nP -iTCP:31322 -sTCP:LISTEN` and the same for 31321 — the listening address on this computer. And the check's refusal shown on a fixture (a 0.0.0.0 mapping fed to the check's parser, not a real exposure) → the NOT RUN line.
   d. Then `bun run db:proof --stop` again; paste its line. The stack is started only when a proof needs it.
2. Rule 00 :13 (your decision 1): yes, in this turn. "never write to a database except through the browser tests' own scratch rows on ethio-staging" gains ", and the throwaway local stack of `bun run db:proof` (rule 50, DEC-343)". One clause; nothing else in rule 00.
3. Your decision 2: `bun run checks` stays NOT RUN locally — P-2 is building on this computer and two test runs never share it; CI is the full proof. Report it NOT RUN with that reason.
4. Records: INC-1063's row (defect, evidence, fix, class as above) and register row 109 naming the check; docs/features/ci-local-backend.md one paragraph. Wording states the check and the setting — no more detail than the fix needs.
5. Push once, END. The new head gets its own CI run; admission moves to it. Report: the --stop lines, the three changes, the proof lines, the NOT RUN line.
```
