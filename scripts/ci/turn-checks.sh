#!/usr/bin/env bash
# Foundations turn CI-2 — `bun run checks`: every CI check that needs no backend, before the push.
# The work is scripts/ci/turn-checks.ts (it reads .github/workflows/ci.yml itself); this is the
# door the AGENTS.md line and package.json name. Exit 1 when any step FAILs; NOT RUN lines name
# their reason; the last line is `checks: N PASS · N FAIL · N NOT RUN · Ns`.
set -euo pipefail
exec bun scripts/ci/turn-checks.ts "$@"
