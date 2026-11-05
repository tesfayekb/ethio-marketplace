# db-proof — ruling 3 (INC-1063: db:proof owns the stack's network; INC-1064)

Base: dev c89271ca2

```text
RULING 3 — db-proof (DEC-343, INC-1063). Base: cursor/db-proof 4746c6bd6. Replaces "continue".
MODEL — Opus 5.5 High.

ACCEPTED: the port check (scripts/db-proof-ports.sh) and its place on every start kind before the holds and `migration up`; CF-DBP-5, CF-DBP-6; rule 00's clause; e56e372ea (the pipe at :114 captured first — INC-1064 — and CF-DBP-2's regex escaping). The check did its job: it refused a fix that did not work.

THE CAUSE (read, not guessed): Docker's bridge-driver docs — the daemon option `ip` sets `com.docker.network.bridge.host_binding_ipv4` for the DEFAULT bridge (docker0) only; a user-defined bridge network takes it as `--opt` at creation. The pinned CLI runs the stack on its own network `supabase_network_<project>`: supabase/cli v2.120.0 apps/cli/src/command-internal/db-bootstrap/container-lifecycle.ts :197–:220 (ensureNetwork: `docker network inspect`, else `docker network create --label …` — an existing network is reused), and `start` takes `--network-id` (apps/cli/src/commands/start/start.handler.ts :840–:847); `stop` prunes networks by the project's label (stop.handler.ts :124). The Docker Desktop setting cannot reach the stack; my instruction was wrong (supervisor slip S537).

1. Mechanism: db:proof owns the stack's network. Before every start (cold and restart): the network db:proof names (your name) exists with `--opt com.docker.network.bridge.host_binding_ipv4=127.0.0.1`; if it is missing, create it; if it exists with any other binding, stop the stack and recreate it. Start the CLI with `--network-id <that name>`. Read the CLI's stop behaviour from the pinned source and state it: whether the network carries the CLI's project label (then stop prunes it and the next start recreates it) or not (then db:proof keeps it) — either is fine, said in one line.
2. The port check stays the law, unchanged in place. Its NOT RUN line names the real fix: the stack's network does not bind 127.0.0.1 — `run db:proof --fresh` (which recreates it). No text anywhere names the Docker Desktop "ip" setting as the fix: rule 50, the script's header, docs/features/ci-local-backend.md, INC-1063's entry and register row 109 say: the network option makes it so, the port check proves it.
3. Guard CF-DBP-7: db-proof.sh starts the CLI only with `--network-id` naming a network it created or verified with host_binding_ipv4=127.0.0.1, before the start; planted copies without the option, without `--network-id`, or with the verification after the start fail.
4. Proof (ruling 2 §1c): `bun run db:proof --fresh` → PASS; `docker ps --format '{{.Names}} {{.Ports}}'` for the stack's containers (ports only, never a key) — every mapping 127.0.0.1; `lsof -nP -iTCP:31322 -sTCP:LISTEN` and the same for 31321 — 127.0.0.1 on this computer; then `bun run db:proof --stop`, its line.
5. INC-1064's root: the lane withheld `bun run checks` (it runs tests) and so ran no guard before the push. You ran the cheap guards this time — keep doing that whenever the tests are withheld. Add ONE roadmap line: `bun run checks` gains a no-tests form (every guard and scanner, no vitest/playwright) so a lane that shares this computer still runs every guard before a push. Register INC-1064's row (defect: a producer piped into `grep -qx` in db-proof.sh :114; evidence: CI run 42021898732, scripts/check-shell-pipes.sh; fix: e56e372ea; class: INC-832's, caught by its guard — root: withheld checks drop the guards).
6. `bun run checks` stays NOT RUN locally (P-2 is building on this computer); CI is the full proof.
7. Push once, PR #23 ready, END. Report: the network's name and option, the stop behaviour line, the proof lines, the NOT RUN line.
```
