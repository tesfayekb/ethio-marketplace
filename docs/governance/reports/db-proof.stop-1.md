STOP — db-proof ruling 2 item 1c: the PASS under the port check cannot be shown; this computer's Docker Engine does not apply its "ip" setting
DONE: parts 1–5 (part 4: ruling 2 items 1a, 1b, 2, 4; part 5: the two reds of CI on 4b9bb7bb7); ruling 2 FIRST and item 1d (both `--stop` lines below)
LEFT: ruling 2 item 1c (one `--fresh` PASS; `docker ps` ports and `lsof` on 31322 / 31321 all 127.0.0.1)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `3d80d4b57dbb1ecc731f37241afbd3bbce265c3e` (short `3d80d4b`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-05T11:34:13Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42016839926
  (pull request #23 on 4b9bb7bb7: 39 pass, 2 fail — Shell-pipes guard and CodeQL, this turn's own, fixed in e56e372ea; report §11)
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
docs/governance/briefs/db-proof.md
docs/governance/mechanisms.md
docs/governance/reports/db-proof.report.md
docs/tracking/incidental-findings.md
package.json
roadmap.md
scripts/ci/local-backend-db.sh
scripts/ci/prepare-local-backend.sh
scripts/conformance/agents-lines-allowlist.txt
scripts/conformance/db-proof.test.ts
scripts/db-proof-ports.sh
scripts/db-proof.sh

The --stop lines. FIRST: `db:proof stopped — the stack's data is kept; the next run starts it again (--fresh wipes it)`. Item 1d: the same line; afterwards no container and no volume of the project remain.

What happened. The one `bun run db:proof --fresh` (29 s) started the stack and the check read its ports from Docker before any migration: `db:proof NOT RUN — the stack's ports are open beyond this computer: set Docker Desktop → Settings → Docker Engine "ip": "127.0.0.1", then run db:proof again`. The stack was stopped with --no-backup; nothing applied. The check is doing its job; the setting is not yet in effect.

The evidence that the setting is not applied. `~/.docker/daemon.json` holds `"ip": "127.0.0.1"` (modified 06:54:51 local). Docker 28.5.1 still publishes a request with no host address on every interface. One of the operator's own containers, restarted at 06:54:52, shows it: requested `{"8080/tcp":[{"HostIp":"","HostPort":"8080"}]}`, published `{"8080/tcp":[{"HostIp":"0.0.0.0","HostPort":"8080"},{"HostIp":"::","HostPort":"8080"}]}`. The pinned CLI requests the same empty address for every service.

The refusal on a fixture (item 1c's last part, done). CF-DBP-6 feeds the parser the line `/saas-adminer 8080/tcp=0.0.0.0:8080 8080/tcp=:::8080`, captured from that container in `stack_ports`' format. It answers the refusal word for word, and the same line on 127.0.0.1 and ::1 answers nothing (Tests 6 passed (6)).

What I need. The operator to make the engine apply the setting: Docker Desktop → Settings → Docker Engine, `"ip": "127.0.0.1"`, Apply & restart (or Quit and reopen Docker Desktop). Their check that it took: a container started afterwards shows `127.0.0.1:` in `docker ps --format '{{.Names}} {{.Ports}}'`. Then `continue`, and I run item 1c (one `--fresh` → PASS, the `docker ps` and `lsof` lines) and item 1d (`--stop`), and bring the report's §12 up to date.

If the engine cannot apply it on this Docker Desktop version, db:proof answers NOT RUN on every start, which is ruling 2's chosen behaviour, and the supervisor rules on the next step. I do not touch Docker's settings.

NOT RUN: `bun run checks` — ruling 2 item 3: P-2 is building on this computer and two test runs never share it; CI is the full proof.
