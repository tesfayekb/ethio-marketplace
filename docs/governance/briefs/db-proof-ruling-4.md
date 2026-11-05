# db-proof — ruling 4 (INC-1063: every mapping carries an explicit 127.0.0.1)

Base: dev c89271ca2

```text
RULING 4 — db-proof (DEC-343, INC-1063). Base: cursor/db-proof 222853a32. Replaces "continue".
MODEL — Opus 5.5 High.

ACCEPTED: stop 2 — measured, isolated, reverted rather than claimed. Your probes settle it: this engine (Docker Desktop, engine 28.5.1) honours ONLY an explicit host address in a mapping; neither the network's host_binding_ipv4 nor the daemon's ip. Ruling 3's premise was grounded in Docker's docs but never probed on this computer (supervisor slip, logged). The Docker Desktop "ip" setting is not the fix anywhere.

1. Mechanism: every mapping the stack publishes carries an explicit 127.0.0.1 — the one form your probe proved. Basis (pinned source, supabase/cli v2.120.0): the CLI spawns the container CLI by NAME — `docker`, then `podman` (apps/cli/src/command-internal/container-cli.ts :57–:79, :131–:139, `ChildProcess.make(runtime, args)`) — and writes each mapping as `<hostPort>:<containerPort>[/<protocol>]` with no address (apps/cli/src/command-internal/db-bootstrap/docker-create-args.ts :28, :184).
   a. A wrapper in the repository (your name; a small script) that db:proof places first on PATH for the pinned CLI's processes ONLY (the `start` call; and any other CLI call you find that creates or starts containers — say which). It rewrites each `-p` / `--publish` value (both `-p X` and `-p=X` / `--publish=X` forms) that has no host address — `<hostPort>:<containerPort>[/<protocol>]` — to `127.0.0.1:<hostPort>:<containerPort>[/<protocol>]`; it leaves every value that already names an address and every other argument (`-e` values included) untouched; then it execs the real docker by the absolute path db:proof resolved BEFORE changing PATH (never itself; it refuses with one line if that path is missing). It never prints, logs or stores its arguments (they carry the stack's local keys).
   b. Your G60 first step: one probe through the wrapper (the same throwaway sleep container, `-p 31399:9`) → Docker publishes 127.0.0.1 only and lsof shows 127.0.0.1:31399; removed at once. If the premise fails, STOP with the probe lines.
   c. The port check stays the law, in its place, unchanged in logic. Its NOT RUN line becomes: the stack's ports are open beyond this computer — the docker wrapper did not reach every mapping (has the pinned CLI's argument form changed?); nothing applied. No text anywhere names a Docker setting as the fix.
2. Guard CF-DBP-7: (i) the wrapper's rewrite, by fixtures: `31322:5432` → `127.0.0.1:31322:5432`; `31321:8443/tcp` → `127.0.0.1:31321:8443/tcp`; `-p=31324:8025` and `--publish 31324:8025` rewritten; `127.0.0.1:1:2` and `[::1]:1:2` unchanged; an `-e` value like `X=1:2` unchanged; (ii) db-proof.sh runs the CLI's `start` only with the wrapper first on PATH and the real docker's path resolved before; planted copies without the wrapper on PATH, or with the wrapper resolving `docker` through PATH, fail.
3. Texts: rule 50, db-proof.sh's header, docs/features/ci-local-backend.md, INC-1063's entry and register row 109 say: the wrapper makes every mapping 127.0.0.1 (the one form this engine honours, by probe), and the port check proves it before any migration applies. Remove every mention of the Docker Desktop "ip" setting and of the network option as a fix.
4. Proof: `bun run db:proof --fresh` → PASS; `docker ps --format '{{.Names}} {{.Ports}}'` for the stack's containers (ports only) — every mapping 127.0.0.1; `lsof -nP -iTCP:31322 -sTCP:LISTEN` and for 31321 — 127.0.0.1; then `bun run db:proof --stop`, its line.
5. `bun run checks` stays NOT RUN locally (P-2 is building here); run the cheap guards and the laws suite as you did; CI is the full proof.
6. Push once, PR #23 ready, END. Report: the wrapper's name, the probe lines, the proof lines, the --stop line, the NOT RUN line.
```
