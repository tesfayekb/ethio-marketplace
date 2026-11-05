#!/usr/bin/env bash
# DEC-343 — THE LOCAL DATABASE FOR PROOFS. `bun run db:proof [--fresh | --stop]`
# Every migration is applied to a throwaway stack on this computer's Docker before it is pushed; the
# stack is 127.0.0.1-only because every start is followed by the INC-1063 check
# (scripts/db-proof-ports.sh: any published port beyond 127.0.0.1 or ::1 stops it, NOT RUN, before
# any migration applies). It applies them the way CI's lanes do: the working copy from
# scripts/ci/prepare-local-backend.sh, the CLI version and the services CI pins (read from
# local-backend-proof.yml, fetched once by checksum, run by its own path), DEC-313's start with no migrations, and the holds, the DEC-340
# capture, the restore and the ledger check from scripts/ci/local-backend-db.sh. A failed apply prints
# scripts/ci/start-failure-excerpt.mjs's excerpt (the server's error record included).
# The stack stays up: a re-run applies only files newer than the last applied one; anything else
# (an applied file changed or gone, a file sorting before the last applied, a changed config) runs
# fresh, its reason first. --stop stops the stack and keeps its data; --fresh wipes it first.
# The last line is the verdict: "db:proof PASS — …", "db:proof FAIL — …" or "db:proof NOT RUN — …".
# Never printed or read: the stack's keys (the start log under the state folder holds them).
set -uo pipefail
cd "$(dirname "$0")/.." || exit 2

# Localhost only: nothing the caller's environment holds reaches the CLI. `bun run` loads the committed
# .env (the hosted project's id and address), the operator's shell may hold ethio-staging's E2E values,
# and the CLI reads every SUPABASE_* name over its config (SUPABASE_PROJECT_ID renamed the stack). The
# project id is set as CI's lanes set it.
for name in $(compgen -e); do
  case "$name" in SUPABASE_* | VITE_* | E2E_* | PG* | DATABASE_URL) unset "$name" ;; esac
done
export SUPABASE_PROJECT_ID=ethio-ci-local

WORKFLOW=.github/workflows/local-backend-proof.yml
CONFIG=scripts/ci/local-backend-config.toml
PROJECT=$SUPABASE_PROJECT_ID
CONTAINER="supabase_db_$PROJECT"
STATE="${ETHIO_DB_PROOF_HOME:-$HOME/.cache/ethio-db-proof}"
WC="$STATE/wc"
START_SECONDS_MAX=900
APPLY_SECONDS_MAX=900
began=$(date +%s)

say() { printf 'db:proof: %s\n' "$*"; }
not_run() {
  printf 'db:proof NOT RUN — %s\n' "$*"
  exit 3
}
failed() {
  printf 'db:proof FAIL — %s\n' "$*"
  exit 1
}

mode=proof
case "${1:-}" in
  "") ;;
  --fresh) mode=fresh ;;
  --stop) mode=stop ;;
  *)
    echo "usage: bun run db:proof [--fresh | --stop]" >&2
    exit 2
    ;;
esac

# The pins, read from CI's workflow (one source); the checksums from the release's checksums.txt,
# matched by GitHub's own asset digests (scripts/conformance/db-proof.test.ts holds the workflow's
# version to this table).
version=$(sed -n 's/^  SUPABASE_CLI_VERSION: *//p' "$WORKFLOW")
excludes=$(sed -n 's/^  BACKEND_EXCLUDES: *//p' "$WORKFLOW")
cli_sha256() {
  case "$1" in
    2.120.0/darwin_arm64) echo 3b8546cc61aeabab6fd1f68edc7f664ebdfa96bdd6a9b18d8d612708f430ae28 ;;
    2.120.0/darwin_amd64) echo 4c6fd79d3feaab3ba404f18044e6abee09d73c39376491476cb64880b3822f46 ;;
    2.120.0/linux_amd64) echo 7074584113aa00495beeac661c41fb09f1ddd0a483cd7333894b0d080086dc6e ;;
    2.120.0/linux_arm64) echo f1747691843837be981fba9f92bf30bf1ddb8cee937ba3806454325af12a8ffc ;;
    *) return 1 ;;
  esac
}
[ -n "$version" ] && [ -n "$excludes" ] || not_run "the CLI pin or the excluded services are missing from $WORKFLOW"

# Preflight: every tool by name, Docker answering, one run at a time.
for tool in docker python3 node openssl tar curl lsof timeout; do
  command -v "$tool" > /dev/null || not_run "$tool is not installed (timeout: GNU coreutils)"
done
sha256() { if command -v sha256sum > /dev/null; then sha256sum "$@"; else shasum -a 256 "$@"; fi; }
timeout 15 docker info > /dev/null 2>&1 || not_run "Docker is not running: start Docker Desktop, then run db:proof again"
mkdir -p "$STATE"
if ! mkdir "$STATE/lock" 2> /dev/null; then
  holder=$(cat "$STATE/lock/pid" 2> /dev/null || echo "")
  if [ -n "$holder" ] && kill -0 "$holder" 2> /dev/null; then not_run "another db:proof is running (pid $holder)"; fi
  rm -rf "$STATE/lock"
  mkdir "$STATE/lock" || not_run "the lock $STATE/lock could not be taken"
fi
echo "$$" > "$STATE/lock/pid"
trap 'rm -rf "$STATE/lock"' EXIT

# The pinned CLI, fetched once into the checks' cache and run only by this path.
case "$(uname -s)" in Darwin) os=darwin ;; Linux) os=linux ;; *) not_run "no pinned CLI for $(uname -s)" ;; esac
case "$(uname -m)" in arm64 | aarch64) arch=arm64 ;; x86_64) arch=amd64 ;; *) not_run "no pinned CLI for $(uname -m)" ;; esac
want=$(cli_sha256 "$version/${os}_$arch") || not_run "no pinned checksum for CLI $version on ${os}_$arch (scripts/db-proof.sh)"
cli_dir="${ETHIO_CHECKS_CACHE:-$HOME/.cache/ethio-checks}/supabase-cli/$version/${os}_$arch"
cli="$cli_dir/supabase"
if [ ! -x "$cli" ]; then
  mkdir -p "$cli_dir"
  tarball="supabase_${version}_${os}_$arch.tar.gz"
  say "fetching the pinned CLI $version (${os}_$arch) once"
  timeout 300 curl -sSfL --retry 3 --retry-delay 5 -o "$cli_dir/$tarball" \
    "https://github.com/supabase/cli/releases/download/v$version/$tarball" ||
    not_run "the pinned CLI download could not be fetched"
  got=$(sha256 "$cli_dir/$tarball" | cut -d' ' -f1)
  if [ "$got" != "$want" ]; then
    rm -f "$cli_dir/$tarball"
    not_run "the pinned CLI download's checksum failed"
  fi
  tar -xzf "$cli_dir/$tarball" -C "$cli_dir" supabase || not_run "the pinned CLI could not be unpacked"
  rm -f "$cli_dir/$tarball"
fi
# The CLI writes supabase/.temp under its working folder, so it never runs in the repository.
[ "$(cd "$cli_dir" && "$cli" --version 2> /dev/null)" = "$version" ] || not_run "$cli does not report version $version"

running() { [ -n "$(docker ps -q --filter "name=^/$CONTAINER\$")" ]; }
has_data() { docker volume ls -q --filter "name=$CONTAINER" | grep -qx "$CONTAINER"; }
stop_stack() {
  # $1: --no-backup wipes the data; empty keeps it. By the working copy's config, or by the project's id.
  local where=(--project-id "$PROJECT")
  [ -f "$WC/supabase/config.toml" ] && where=(--workdir "$WC")
  (cd "$STATE" && timeout 180 "$cli" stop "${where[@]}" ${1:+"$1"}) > "$STATE/stop.log" 2>&1 ||
    not_run "the stack did not stop (exit $?); see $STATE/stop.log"
}

if [ "$mode" = stop ]; then
  stop_stack ""
  echo "db:proof stopped — the stack's data is kept; the next run starts it again (--fresh wipes it)"
  exit 0
fi

# The working copy, prepared the one way CI prepares it, into a new folder beside the running one.
next="$STATE/next"
rm -rf "$next"
bash scripts/ci/prepare-local-backend.sh "$next" "$STATE/working-copy.txt" > "$STATE/prepare.log" 2>&1 ||
  not_run "the working copy could not be prepared: $(tail -n 1 "$STATE/prepare.log")"
manifest() {
  # "<sha256> <name>" for the config and every migration of a working copy, in apply order.
  (cd "$1/supabase" && sha256 config.toml && cd migrations && for f in *.sql; do sha256 "$f"; done) |
    awk '{ print $1, $2 }'
}
manifest "$next" > "$STATE/next.manifest"

# Warm or fresh: the reason comes first, in one line.
reason=""
if [ "$mode" = fresh ]; then
  reason="asked (--fresh)"
elif ! has_data; then
  reason="no stack on this computer yet"
elif [ ! -s "$STATE/applied.manifest" ]; then
  reason="no record of what the stack holds"
else
  reason=$(python3 - "$STATE/applied.manifest" "$STATE/next.manifest" << 'PY'
import sys
applied = dict(reversed(line.split()) for line in open(sys.argv[1]).read().splitlines() if line)
now = dict(reversed(line.split()) for line in open(sys.argv[2]).read().splitlines() if line)
if applied.get('config.toml') != now.get('config.toml'):
    print('the config changed'); raise SystemExit
names = sorted(n for n in applied if n != 'config.toml')
for name in names:
    if name not in now:
        print('an applied file is gone: ' + name); raise SystemExit
    if now[name] != applied[name]:
        print('an applied file changed: ' + name); raise SystemExit
last = names[-1] if names else ''
early = sorted(n for n in now if n != 'config.toml' and n not in applied and n < last)
if early:
    print('a new file sorts before the last applied one: ' + early[0])
PY
  )
fi
if [ -n "$reason" ]; then
  say "fresh — $reason"
  if has_data || running; then stop_stack --no-backup; fi
  rm -f "$STATE/applied.manifest"
  start_kind=cold
elif running; then
  say "warm — the stack is up; only new files apply"
  start_kind=warm
else
  say "restart — the stack's data is kept; only new files apply"
  stop_stack ""
  start_kind=restart
fi
rm -rf "$WC"
mv "$next" "$WC"

# DEC-343 ruling B: a throwaway self-signed localhost certificate, so the config stays CI's. Nothing
# trusts it and db:proof never calls the API.
if [ ! -s "$STATE/certs/api.pem" ] || [ ! -s "$STATE/certs/api.key" ]; then
  mkdir -p "$STATE/certs"
  openssl req -x509 -newkey rsa:2048 -sha256 -days 3650 -nodes -keyout "$STATE/certs/api.key" \
    -out "$STATE/certs/api.pem" -subj "/CN=localhost" \
    -addext "subjectAltName=DNS:localhost,IP:127.0.0.1" > /dev/null 2>&1 ||
    not_run "openssl could not make the stack's localhost certificate"
fi
mkdir -p "$WC/supabase/certs"
cp "$STATE/certs/api.pem" "$STATE/certs/api.key" "$WC/supabase/certs/"

# DEC-313: the stack starts with no migrations; they apply afterwards, held, in one session.
if [ "$start_kind" != warm ]; then
  for port in $(sed -n 's/^\(shadow_\)\{0,1\}port = \([0-9]*\)$/\2/p' "$CONFIG"); do
    holder=$(lsof -nP -iTCP:"$port" -sTCP:LISTEN -Fc 2> /dev/null | sed -n 's/^c//p' | head -n 1)
    [ -z "$holder" ] || not_run "port $port is in use by $holder; stop it, then run db:proof again"
  done
  held="$STATE/held-migrations"
  rm -rf "$held"
  mv "$WC/supabase/migrations" "$held"
  mkdir -p "$WC/supabase/migrations"
  timeout --kill-after=15 "$START_SECONDS_MAX" "$cli" start --workdir "$WC" -x "$excludes" > "$STATE/start.log" 2>&1
  result=$?
  rmdir "$WC/supabase/migrations"
  mv "$held" "$WC/supabase/migrations"
  if [ "$result" -ne 0 ]; then
    if grep -qi 'no space left on device' "$STATE/start.log"; then
      not_run "Docker's disk is full (no space left on device): free space in Docker Desktop, then run db:proof --fresh"
    elif grep -qiE 'address already in use|port is already allocated' "$STATE/start.log"; then
      not_run "a port of the stack is in use ($(grep -m1 -oE '[0-9.]*:3132[0-9]' "$STATE/start.log" || echo 'see the start log'))"
    elif grep -qiE 'toomanyrequests|rate exceeded|pull access denied|TLS handshake timeout|i/o timeout' "$STATE/start.log"; then
      not_run "the image registry refused or timed out a pull; run db:proof again later"
    elif [ "$result" -eq 124 ] || [ "$result" -eq 137 ]; then
      not_run "the start ran past its ${START_SECONDS_MAX} s deadline"
    fi
    not_run "the start failed (exit $result); its log $STATE/start.log holds the stack's local keys and is not printed"
  fi
fi
running || not_run "the database container $CONTAINER is not running after the start"
# INC-1063: every start kind (cold, restart, warm) is checked here, before any migration applies.
# shellcheck source=scripts/db-proof-ports.sh
source scripts/db-proof-ports.sh
ports=$(stack_ports "$PROJECT") || {
  stop_stack --no-backup
  not_run "Docker did not answer the stack's published ports; the stack was stopped"
}
refusal=$(printf '%s\n' "$ports" | ports_refusal)
if [ -n "$refusal" ]; then
  stop_stack --no-backup
  rm -f "$STATE/applied.manifest"
  not_run "$refusal"
fi
export DATABASE_CONTAINER="$CONTAINER"
export LOCAL_BACKEND_STATUS="$STATE/status.txt" LOCAL_BACKEND_FAILURE="$STATE/failure.txt"
: > "$LOCAL_BACKEND_STATUS"
: > "$LOCAL_BACKEND_FAILURE"
# shellcheck source=scripts/ci/local-backend-db.sh
source scripts/ci/local-backend-db.sh

# The applied files, read back from the ledger after every apply (a failed file is not in it).
record_applied() {
  admin_sql "select version from supabase_migrations.schema_migrations" > "$STATE/ledger-versions.txt" 2> /dev/null || return 0
  python3 - "$STATE/ledger-versions.txt" "$STATE/next.manifest" > "$STATE/applied.manifest" << 'PY'
import sys
versions = set(open(sys.argv[1]).read().split())
for line in open(sys.argv[2]).read().splitlines():
    digest, name = line.split()
    if name == 'config.toml' or name.split('_', 1)[0] in versions:
        print(digest, name)
PY
}

hold_background_work || failed "the background work could not be held: $(tail -n 1 "$LOCAL_BACKEND_FAILURE")"
apply_began=$(date -u +%Y-%m-%dT%H:%M:%SZ)
timeout --kill-after=15 "$APPLY_SECONDS_MAX" "$cli" migration up --local --workdir "$WC" > "$STATE/apply.log" 2>&1
result=$?
if [ "$result" -ne 0 ]; then
  rm -rf "$STATE/capture"
  db_error_capture "$STATE/capture" "$apply_began" "$DATABASE_CONTAINER" ||
    echo "db-error-capture: exit $? (DEC-340)" >> "$LOCAL_BACKEND_FAILURE"
  record_applied
  # The stack stays up for the next run; its held settings go back (not judged after a failure).
  restore_background_work > /dev/null 2>&1 || true
  node scripts/ci/start-failure-excerpt.mjs "$STATE/apply.log" "$STATE/capture" > "$STATE/excerpt.json"
  # The excerpt on the terminal; the verdict (the file, the server record's channel) for the last line.
  python3 - "$STATE/excerpt.json" "$result" "$STATE/verdict.txt" << 'PY'
import json, re, sys
excerpt = json.load(open(sys.argv[1]))
print('\n'.join(excerpt['section']))
failure = excerpt['failure'][0] if excerpt['failure'] else ''
match = re.search(r'Applying migration (\S+?)(?:\.\.\.)?$', failure)
server = next((line for line in excerpt['server'] if line.startswith('Server record')), '')
channel = re.search(r'\(DEC-340, (\w+)', server)
what = 'ran past its deadline' if int(sys.argv[2]) in (124, 137) else 'failed'
open(sys.argv[3], 'w').write((match[1] if match else 'no migration reached') + ' ' + what
                             + ' (server record: ' + (channel[1] if channel else 'none') + ')')
PY
  verdict=$(cat "$STATE/verdict.txt" 2> /dev/null || echo "the apply failed (exit $result); the excerpt could not be read")
  if grep -qi 'no space left on device' "$STATE/apply.log"; then verdict="$verdict; Docker's disk is full"; fi
  failed "$verdict"
fi
restore_background_work || failed "$(tail -n 1 "$LOCAL_BACKEND_FAILURE")"
ledger_check "$WC" "$STATE/ledger.txt" 2> /dev/null || failed "$(tail -n 1 "$LOCAL_BACKEND_FAILURE")"
record_applied
echo "db:proof PASS — $(cat "$STATE/ledger.txt"), CLI $version, $start_kind, $(($(date +%s) - began)) s"
