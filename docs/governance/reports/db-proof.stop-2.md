STOP — db-proof ruling 3 item 1: the premise does not hold on this computer; a network with host_binding_ipv4=127.0.0.1 still publishes on every interface
DONE: ruling 3 saved (a46e61edf); item 5 (INC-1064's entry, the roadmap line — 4b02f74a6); the --stop line below
LEFT: ruling 3 items 1–4 and 7 (the network mechanism, its wording, CF-DBP-7, the PASS proof, the pull request ready)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `4b9bb7bb7a3e554dca4755dd99d22f600e554867` (short `4b9bb7b`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-05T12:07:46Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42021898732
  (that FAILURE is the two reds fixed in e56e372ea; pull request #23 on 4746c6bd6, read at this stop: 30 pass, 9 lanes pending, 0 fail)
FILES:
.cursor/rules/00-protocol.mdc
.cursor/rules/30-migrations.mdc
.cursor/rules/50-security.mdc
.cursor/rules/60-report.mdc
.github/workflows/local-backend-proof.yml
AGENTS.md
docs/_changelog.md
docs/features/ci-local-backend.md
docs/governance/briefs/db-proof-ruling-1.md
docs/governance/briefs/db-proof-ruling-2.md
docs/governance/briefs/db-proof-ruling-3.md
docs/governance/briefs/db-proof.md
docs/governance/mechanisms.md
docs/governance/reports/db-proof.report.md
docs/governance/reports/db-proof.stop-1.md
docs/tracking/incidental-findings.md
package.json
roadmap.md
scripts/ci/local-backend-db.sh
scripts/ci/prepare-local-backend.sh
scripts/conformance/agents-lines-allowlist.txt
scripts/conformance/db-proof.test.ts
scripts/db-proof-ports.sh
scripts/db-proof.sh

What was built and measured, then reverted. The network was `ethio-db-proof-ethio-ci-local`, created with
`docker network create --opt com.docker.network.bridge.host_binding_ipv4=127.0.0.1`. Docker read it back
as {"com.docker.network.bridge.host_binding_ipv4":"127.0.0.1","com.docker.network.enable_ipv4":"true",
"com.docker.network.enable_ipv6":"false"}, with no labels. Every start ensured it (recreated on --fresh or
any other binding) and passed `--network-id` to the pinned CLI's `start`, whose help lists "--network-id
string  use the specified docker network instead of a generated one". The NOT RUN line named the network
and `--fresh`.

Two `bun run db:proof --fresh` runs (29 s each) both answered the port check's refusal before any
migration. The ports db:proof read from Docker on the second run (names and ports only):
  /supabase_inbucket_ethio-ci-local 8025/tcp=0.0.0.0:31324 8025/tcp=:::31324
  /supabase_kong_ethio-ci-local 8443/tcp=0.0.0.0:31321 8443/tcp=:::31321
  /supabase_db_ethio-ci-local 5432/tcp=0.0.0.0:31322 5432/tcp=:::31322
  (storage, rest and auth publish nothing)

The probes isolate it. Each used one throwaway container from the stack's own postgres image, running
only `sleep` (nothing listening inside), removed at once:
  on the network, `-p 31399:9`  → requested HostIp "", published 0.0.0.0 and ::; lsof: com.docker IPv6 *:31399
  on the network, `-p 127.0.0.1:31399:9` → published 127.0.0.1; lsof: com.docker IPv4 127.0.0.1:31399
  default bridge, `-p 31399:9` (daemon "ip": "127.0.0.1" set) → published 0.0.0.0 and ::
So this engine (Docker Desktop, engine 28.5.1, linuxkit 6.10.14) honours an explicit host address in a
mapping. It applies neither default: not the network's host_binding_ipv4, and not the daemon's ip on
docker0. Docker Desktop's own settings file is closed to me by macOS's privacy control, and I did not
look further. I reverted the network code rather than land text claiming it makes the stack local, and
removed the network. No container, volume or network of the stack remains.

The stop behaviour line, read from the pinned source (supabase/cli v2.120.0): the CLI's `stop` prunes
only networks labelled com.supabase.cli.project=<project> (docker-remove-all.ts :214–:219;
docker-ids.ts :63, :103), and ensureNetwork reuses an existing network as it is
(container-lifecycle.ts :197–:220). A network db:proof creates without that label survives every stop,
and db:proof keeps it.

The --stop line: `db:proof stopped — the stack's data is kept; the next run starts it again (--fresh wipes it)`.

NOT RUN: `bun run checks` — ruling 3 item 6: P-2 is building on this computer; CI is the full proof. The
laws suite ran on 4b02f74a6: Tests 1 failed | 462 passed (463), the one failure NH-6 (macOS). The
shell-pipes guard and format:check are clean.

What I need: a ruling on how the stack's ports reach 127.0.0.1 on this engine. The measurements show
only an explicit host address works. The pinned CLI writes `-p <hostPort>:<containerPort>` with no way
to give one, and db:proof does not edit Docker's settings. Until a ruling, the committed tree (4746c6bd6
plus this stop) keeps ruling 2's check. db:proof answers NOT RUN on this computer, and its line still
names the Docker Desktop "ip" setting, which ruling 3 item 2 calls wrong and the probes confirm does not
help here. I have not changed that line, because the fix it should name is the open question.
